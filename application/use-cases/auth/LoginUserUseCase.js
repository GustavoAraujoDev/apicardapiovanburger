class LoginUserUseCase {
  constructor(userRepo, passwordHasher, tokenService) {
    this.userRepo = userRepo;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute({ email, password }) {
    console.log("[LOGIN_USECASE] Iniciando login:", email);

    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      console.warn("[LOGIN_USECASE] Usuário não encontrado:", email);
      throw new Error("Credenciais inválidas");
    }

    if (!user.canLogin()) {
      console.warn("[LOGIN_USECASE] Usuário inativo:", email);
      throw new Error("Credenciais inválidas");
    }

    const validPassword = await this.passwordHasher.compare(
      password,
      user.getPasswordHash()
    );

    if (!validPassword) {
      console.warn("[LOGIN_USECASE] Senha inválida:", email);
      throw new Error("Credenciais inválidas");
    }

    const accessToken = this.tokenService.generateAccessToken({
      sub: user.id,
      role: user.role
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      sub: user.id
    });

    console.log("[LOGIN_USECASE] Login realizado com sucesso:", email);

    return {
      accessToken,
      refreshToken
    };
  }
}

module.exports = LoginUserUseCase;
