export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    private readonly passwordHash: string,
    public readonly role: 'ADMIN' | 'EMPLOYEE',
    private readonly active: boolean = true
  ) {}

  canLogin(): boolean {
    return this.active;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
