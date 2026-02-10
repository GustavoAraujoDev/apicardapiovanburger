class UserBlocked {
  constructor({ userId, reason }) {
    this.name = 'UserBlocked';
    this.userId = userId;
    this.reason = reason;
    this.occurredAt = new Date();
  }
}

module.exports = UserBlocked;
