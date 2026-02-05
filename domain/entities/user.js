class User {
  constructor(
    id,
    email,
    passwordHash,
    role,
    active = true
  ) {
    this.id = id;
    this.email = email,
    this.passwordHash = passwordHash,
    this.role = role,
    this.active = active
  }

  canLogin() {
    return this.active;
  }

  getPasswordHash() {
    return this.passwordHash;
  }
}

module.exports = User;