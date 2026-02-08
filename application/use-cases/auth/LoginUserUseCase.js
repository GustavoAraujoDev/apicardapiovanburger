class LoginUserUseCase {
  constructor(userRepo, passwordHasher, tokenService) {
    this.userRepo = userRepo;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute({ email, password }) {
    console.log("[LOGIN_USECASE] Iniciando login:", email);

    const user = await this.userRepo.findByEmail(email);
    console.log("[LOGIN_USECASE] Usuário encontrado?", !!user);

    if (!user) {
      console.warn("[LOGIN_USECASE] Usuário não encontrado:", email);
      throw new Error("Credenciais inválidas");
    }

    console.log("[LOGIN_USECASE] Usuário ativo?", user.active);

    if (!user.canLogin()) {
      console.warn("[LOGIN_USECASE] Usuário inativo:", email);
      throw new Error("Credenciais inválidas");
    }

    console.log("[LOGIN_USECASE] Validando senha");

    const validPassword = await this.passwordHasher.compare(
      password,
      user.getPasswordHash()
    );

    console.log("[LOGIN_USECASE] Senha válida?", validPassword);

    if (!validPassword) {
      throw new Error("Credenciais inválidas");
    }

    console.log("[LOGIN_USECASE] Gerando tokens");

    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    console.log("[LOGIN_USECASE] Login realizado com sucesso:", email);

    return {
      accessToken,
      refreshToken
    };
  }
}

module.exports = LoginUserUseCase;
