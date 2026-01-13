const {planReinjection} = require('../src/planner/reinject');

test('planner allocates full treasury', () => {
  const event = {time: 10, price: 2.0, drawdownPercent: 30, peakPrice: 3.0};
  const snap = {balance: 1000.0};
  const plan = planReinjection({event, treasurySnapshot: snap, price: event.price, targetToken: 'pumpfin'});
  expect(plan.planned).toBe(true);
  expect(plan.amountToDeploy).toBeCloseTo(1000.0);
  expect(plan.expectedUnits).toBeCloseTo(500.0); // 1000/2
});