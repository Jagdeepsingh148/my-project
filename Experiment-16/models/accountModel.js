let balance = 1000;

module.exports = {
  getBalance: () => balance,
  deposit: (amount) => {
    balance += amount;
    return balance;
  },
  withdraw: (amount) => {
    if (amount > balance) return null;
    balance -= amount;
    return balance;
  }
};
