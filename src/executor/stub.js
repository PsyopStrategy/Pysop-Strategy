// Executor stub. Does NOT perform real trades by default. Implements an interface that real execution modules must follow.

class ExecutorStub {
  constructor({enabled = false} = {}) {
    this.enabled = Boolean(enabled);
    this.history = [];
  }

  async executeBuy({token, amount, price}) {
    const record = {time: Date.now(), token, amount, price};
    if (this.enabled) {
      // Real implementation would interact with exchange / chain here.
      // For safety, we do not implement it. Throw to force implementer to opt-in.
      throw new Error('Executor enabled but no implementation provided. Implement a concrete executor.');
    }
    this.history.push({action: 'simulateBuy', ...record});
    return {simulated: true, ...record};
  }
}

module.exports = {ExecutorStub};