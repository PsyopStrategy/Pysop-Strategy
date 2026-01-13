const {detectDrawdowns} = require('../src/detection/drawdown');

test('detects a 30% drawdown', () => {
  const prices = [
    {time: 0, price: 1.0},
    {time: 1, price: 1.2},
    {time: 2, price: 1.5}, // peak 1.5
    {time: 3, price: 1.1}, // drawdown 26.66%
    {time: 4, price: 1.05}, // drawdown 30% => event
  ];
  const evs = detectDrawdowns(prices, 30);
  expect(evs.length).toBe(1);
  expect(evs[0].drawdownPercent).toBeGreaterThanOrEqual(30);
});