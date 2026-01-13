// Deterministic reinjection planner
// Input: event, treasury snapshot, current price, target token
// Output: plan object detailing allocation (all funds)

function planReinjection({event, treasurySnapshot, price, targetToken = 'pumpfin'}) {
  // deterministic plan: allocate all funds proportionally (here, all to target)
  const amountToDeploy = Number(treasurySnapshot.balance);
  if (amountToDeploy <= 0) return {planned: false, reason: 'empty_treasury'};

  const units = amountToDeploy / price; // how many tokens to buy at current price

  const plan = {
    planned: true,
    timestamp: Date.now(),
    event,
    targetToken,
    price,
    amountToDeploy: Number(amountToDeploy.toFixed(8)),
    expectedUnits: Number(units.toFixed(8)),
    rationale: `Full allocation on ${event.drawdownPercent}% drawdown from peak ${event.peakPrice}`,
  };
  return plan;
}

module.exports = {planReinjection};