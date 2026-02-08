const UserRepository = require('../../domain/entities/UserRepository');
const PasswordService = require('../../domain/services/PasswordService');
const User = require('../../domain/entities/user');
const { randomUUID } = require('crypto');

class RegisterUserUseCase {
  constructor(userRepository, passwordService) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
  }

  async execute({ email, password, role }) {

    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const exists = await this.userRepository.findByEmail(email);

    if (exists) {
      throw new Error('Usuário já existe');
    }

    // ✅ controle de roles
    const allowedRoles = ['user', 'admin'];
    if (!allowedRoles.includes(role)) {
      throw new Error('Role inválida');
    }

    const passwordHash = await this.passwordService.hash(password);

    const user = new User(
      randomUUID(),
      email,
      passwordHash,
      role,
      true
    );

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      active: user.active
    };
  }
}

module.exports = RegisterUserUseCase;
