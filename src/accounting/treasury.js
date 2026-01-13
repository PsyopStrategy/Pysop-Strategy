// Simple deterministic treasury accounting

class Treasury {
  constructor(initial = 0.0) {
    this.balance = Number(initial);
    this.ledger = [];
  }

  credit(amount, source = 'profit') {
    amount = Number(amount);
    this.balance += amount;
    this.ledger.push({type: 'credit', amount, source, time: Date.now()});
  }

  debit(amount, reason = 'reinject') {
    amount = Number(amount);
    if (amount > this.balance) throw new Error('Insufficient treasury balance');
    this.balance -= amount;
    this.ledger.push({type: 'debit', amount, reason, time: Date.now()});
    return amount;
  }

  snapshot() {
    return {balance: this.balance, ledger: [...this.ledger]};
  }
}

module.exports = {Treasury};