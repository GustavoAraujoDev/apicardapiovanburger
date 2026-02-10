const UserPolicy = require('../../../domain/policies/UserPolicy');

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
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // 🔥 ABAC (Policy pura)
    if (!UserPolicy.canLogin(user, context)) {
      user.registerFailedLogin();
      await this.userRepo.save(user);
      await this.eventDispatcher.dispatchAll(
        user.pullDomainEvents()
      );
      throw new Error('LOGIN_NOT_ALLOWED');
    }

    const validPassword = await this.passwordHasher.compare(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      user.registerFailedLogin();
      await this.userRepo.save(user);
      await this.eventDispatcher.dispatchAll(
        user.pullDomainEvents()
      );
      throw new Error('INVALID_CREDENTIALS');
    }

    user.registerSuccessfulLogin(context);
    await this.userRepo.save(user);

    await this.eventDispatcher.dispatchAll(
      user.pullDomainEvents()
    );

    return {
      accessToken: this.tokenService.generateAccessToken(user),
      refreshToken: await this.tokenService.generateRefreshToken(user)
    };
  }
}

module.exports = LoginUserUseCase;
