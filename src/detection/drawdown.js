// Drawdown detector: detects rolling local peaks and percent drawdowns

function detectDrawdowns(prices, percentThreshold = 30) {
  // prices: array of {time, price}
  // returns array of events: {time, price, peakTime, peakPrice, drawdownPercent}
  const events = [];
  let peakPrice = -Infinity;
  let peakTime = null;

  for (const p of prices) {
    if (p.price > peakPrice) {
      peakPrice = p.price;
      peakTime = p.time;
    }
    const drawdownPercent = ((peakPrice - p.price) / peakPrice) * 100;
    if (drawdownPercent >= percentThreshold) {
      events.push({
        time: p.time,
        price: p.price,
        peakTime,
        peakPrice,
        drawdownPercent: Number(drawdownPercent.toFixed(2)),
      });
      // reset peak to current so we only trigger once per distinct event
      peakPrice = p.price;
      peakTime = p.time;
    }
  }
  return events;
}

module.exports = {detectDrawdowns};