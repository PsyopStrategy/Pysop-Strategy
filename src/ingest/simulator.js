// Simple deterministic price simulator for testing and simulation
// Produces an array of {time, price}
function generatePriceSeries({steps = 200, seed = 42} = {}) {
  // Deterministic pseudo-random (LCG)
  let x = seed;
  const rand = () => {
    x = (1664525 * x + 1013904223) % 0x100000000;
    return (x / 0x100000000) * 2 - 1; // in [-1,1]
  };

  const prices = [];
  let p = 1.0;
  for (let i = 0; i < steps; i++) {
    // small drift + noise, occasional down-pumps
    const noise = rand() * 0.02;
    const drift = 0.0005;
    // occasional structured drawdown
    if (i % 60 === 45) {
      p *= 0.6; // simulate large drawdown ~40%
    } else {
      p *= 1 + drift + noise;
    }
    prices.push({time: i, price: Number(p.toFixed(8))});
  }
  return prices;
}

module.exports = {generatePriceSeries};