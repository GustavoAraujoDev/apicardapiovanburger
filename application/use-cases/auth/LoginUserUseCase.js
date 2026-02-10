class LoginUserUseCase {
  constructor(
    userRepo,
    passwordHasher,
    tokenService,
    eventDispatcher
  ) {
    this.userRepo = userRepo;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
    this.eventDispatcher = eventDispatcher;
  }

  async execute({ email, password, context }) {
    console.log('[LOGIN_USECASE] Iniciando login:', email);

    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      console.warn('[LOGIN_USECASE] Usuário não encontrado');
      throw new Error('INVALID_CREDENTIALS');
    }

    // 👉 regra de domínio
    if (!user.canLogin()) {
      console.warn('[LOGIN_USECASE] Usuário bloqueado/inativo');
      throw new Error('INVALID_CREDENTIALS');
    }

    const validPassword = await this.passwordHasher.compare(
      password,
      user.passwordHash // OK: use case pode acessar, controller NÃO
    );

    if (!validPassword) {
      console.warn('[LOGIN_USECASE] Senha inválida');

      user.registerFailedLogin();
      await this.userRepo.save(user);

      // dispara eventos (ex: UserBlocked)
      await this.eventDispatcher.dispatch(
        user.pullDomainEvents()
      );

      throw new Error('INVALID_CREDENTIALS');
    }

    // 👉 sucesso
    user.registerSuccessfulLogin(context);
    await this.userRepo.save(user);

    await this.eventDispatcher.dispatch(
      user.pullDomainEvents()
    );

    const accessToken =
      this.tokenService.generateAccessToken(user);

    const refreshToken =
      await this.tokenService.generateRefreshToken(user);

    console.log('[LOGIN_USECASE] Login realizado com sucesso');

    return {
      accessToken,
      refreshToken
    };
  }
}

module.exports = LoginUserUseCase;
