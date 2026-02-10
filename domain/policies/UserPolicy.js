class UserPolicy {
  static can({ user, action, context }) {
    if (!user) return false;

    if (action === 'LOGIN') {
      if (!user.canLogin()) return false;
      if (context?.ipBlacklisted) return false;
      return true;
    }

    if (action === 'ACCESS_ADMIN') {
      return user.role.value === 'admin';
    }

    return false;
  }
}

module.exports = UserPolicy;
