const UserBlocked = require('../events/UserBlocked');
const UserLoggedIn = require('../events/UserLoggedIn');

class User {
  constructor({
    id,
    email,
    passwordHash,
    role,
    status = 'active',
    loginAttempts = 0,
    lastLoginAt = null,
    blockedAt = null,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.validateRequiredFields({ id, email, passwordHash, role });
    this.validateEmail(email);
    this.validateRole(role);
    this.validateStatus(status);

    this.id = id;
    this.email = email.toLowerCase().trim();
    this.passwordHash = passwordHash;
    this.role = role;
    this.status = status;

    this.loginAttempts = loginAttempts;
    this.lastLoginAt = lastLoginAt;
    this.blockedAt = blockedAt;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.domainEvents = [];
  }

  /* ==========================
     INVARIANTES / VALIDAÇÕES
     ========================== */

  validateRequiredFields(fields) {
    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined || value === null || value === '') {
        throw new Error(`Field "${key}" is required`);
      }
    }
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  validateRole(role) {
    const allowedRoles = ['admin', 'manager', 'user'];
    if (!allowedRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }
  }

  validateStatus(status) {
    const allowedStatus = ['active', 'blocked', 'inactive'];
    if (!allowedStatus.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
  }

  /* ==========================
     ESTADO E COMPORTAMENTO
     ========================== */

  registerSuccessfulLogin(context) {
    if (!this.canLogin()) {
      throw new Error('User is not allowed to login');
    }

    this.loginAttempts = 0;
    this.lastLoginAt = new Date();
    this.touch();

    this.domainEvents.push(
      new UserLoggedIn({
        userId: this.id,
        ip: context?.ip
      })
    );
  }

  registerFailedLogin(maxAttempts = 5) {
    this.loginAttempts += 1;
    this.touch();

    if (this.loginAttempts >= maxAttempts) {
      this.block('Too many failed login attempts');
    }
  }

  block(reason = 'Blocked by system') {
    if (this.status === 'blocked') return;

    this.status = 'blocked';
    this.blockedAt = new Date();
    this.touch();

    this.domainEvents.push(
      new UserBlocked({
        userId: this.id,
        reason
      })
    );
  }

  unblock() {
    this.status = 'active';
    this.loginAttempts = 0;
    this.blockedAt = null;
    this.touch();
  }

  deactivate() {
    this.status = 'inactive';
    this.touch();
  }

  /* ==========================
     SEGURANÇA
     ========================== */

  getPasswordHash() {
    throw new Error('Direct access to password hash is forbidden');
  }

  canChangePassword() {
    return this.status === 'active';
  }

  /* ==========================
     EVENTOS DE DOMÍNIO
     ========================== */

  pullDomainEvents() {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  /* ==========================
     UTILITÁRIOS
     ========================== */

  touch() {
    this.updatedAt = new Date();
  }
}

module.exports = User;
