class LoginUserUseCase {
  constructor(userRepo, passwordHasher, tokenService) {
    this.userRepo = userRepo,
    this.passwordHasher = passwordHasher,
    this.tokenService = tokenService
  }

  async execute(email, password) {
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

module.exports = LoginUserUseCase;

