import bcrypt from 'bcrypt';
import { PasswordService } from '../../../domain/services/PasswordService';

export class BcryptPasswordService implements PasswordService {
  async hash(password: string) {
    return bcrypt.hash(password, 12);
  }

  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
