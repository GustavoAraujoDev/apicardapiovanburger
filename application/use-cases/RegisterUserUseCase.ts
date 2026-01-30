import { UserRepository } from '../../domain/entities/UserRepository';
import { PasswordService } from '../../domain/services/PasswordService';
import { User } from '../../domain/entities/User';
import { randomUUID } from 'crypto';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService
  ) {}

  async execute(
    email: string,
    password: string,
    role: 'ADMIN' | 'EMPLOYEE'
  ): Promise<void> {

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
