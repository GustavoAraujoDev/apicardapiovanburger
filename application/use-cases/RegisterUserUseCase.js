const UserRepository = require('../../domain/entities/UserRepository');
const PasswordService = require('../../domain/services/PasswordService');
const User = require('../../domain/entities/user');
const randomUUID = require('crypto');

class RegisterUserUseCase {
  constructor(
     userRepository,
     passwordService
  ) {
    this.userRepository = userRepository,
    this.passwordService = passwordService
  }

  async execute(
    email,
    password,
    role 
  ) {

    const exists = await this.userRepository.findByEmail(email);

    if (exists) {
      throw new Error('Usuário já existe');
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
  }
}

module.exports = RegisterUserUseCase;