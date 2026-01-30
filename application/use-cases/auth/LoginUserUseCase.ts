class LoginUserUseCase {
  constructor(
    private readonly userRepo: any,
    private readonly passwordHasher: any,
    private readonly tokenService: any
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !user.canLogin()) {
      throw new Error('Credenciais inválidas');
    }

    const validPassword = await this.passwordHasher.compare(
      password,
      user.getPasswordHash()
    );

    if (!validPassword) {
      throw new Error('Credenciais inválidas');
    }

    const accessToken = this.tokenService.generateAccessToken({
      sub: user.id,
      role: user.role
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      sub: user.id
    });

    return {
      accessToken,
      refreshToken
    };
  }
}

module.exports =  LoginUserUseCase;
