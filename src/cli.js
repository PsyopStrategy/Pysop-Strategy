#!/usr/bin/env node
const {generatePriceSeries} = require('./ingest/simulator');
const {detectDrawdowns} = require('./detection/drawdown');
const {Treasury} = require('./accounting/treasury');
const {planReinjection} = require('./planner/reinject');
const {ExecutorStub} = require('./executor/stub');
const dotenv = require('dotenv');

dotenv.config();

async function simulate(opts = {}) {
  const steps = Number(process.env.SIMULATOR_STEPS || 200);
  const detectorPercent = Number(process.env.DETECT_DRAWDOWN_PERCENT || 30);
  const treasuryInit = Number(process.env.TREASURY_INITIAL || 1000.0);
  const target = process.env.TARGET_TOKEN || 'pumpfin';
  const executorEnabled = process.env.EXECUTOR_ENABLED === 'true';

  const prices = generatePriceSeries({steps});
  const events = detectDrawdowns(prices, detectorPercent);

  const treasury = new Treasury(treasuryInit);
  // simulate some accumulated fees over time (deterministic)
  treasury.credit(100, 'creator_fees');

  console.log('Simulation summary: steps', steps, 'detector', detectorPercent + '%');
  console.log('Detected drawdown events:', events.length);

  const executor = new ExecutorStub({enabled: executorEnabled});

  for (const ev of events) {
    const currentPrice = ev.price;
    const snapshot = treasury.snapshot();
    const plan = planReinjection({event: ev, treasurySnapshot: snapshot, price: currentPrice, targetToken: target});
    if (!plan.planned) {
      console.log('No funds to deploy at', ev);
      continue;
    }
    console.log('Planned reinjection:', plan);

    // debit all funds as per policy
    try {
      const amount = treasury.debit(plan.amountToDeploy, 'reinject');
      // execute (simulated by default)
      const res = await executor.executeBuy({token: plan.targetToken, amount, price: plan.price});
      console.log('Executor result:', res);
      // notify
      const {notify} = require('./reporting/notifier');
      const webhook = process.env.NOTIFY_WEBHOOK || '';
      await notify({message: `Reinjection planned: ${JSON.stringify(plan)} ; exec=${res.simulated ? 'simulated' : 'live'}`, webhookUrl: webhook});
    } catch (err) {
      console.error('Execution error:', err.message);
    }
  }
}

if (require.main === module) {
  const cmd = process.argv[2] || 'simulate';
  if (cmd === 'simulate') simulate();
}

module.exports = {simulate};