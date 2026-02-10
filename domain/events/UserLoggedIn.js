class UserLoggedIn {
  constructor({ userId, ip }) {
    this.name = 'UserLoggedIn';
    this.userId = userId;
    this.ip = ip;
    this.occurredAt = new Date();
  }
}

module.exports = UserLoggedIn;
