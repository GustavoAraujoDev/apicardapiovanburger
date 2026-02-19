const UserRepository = require('../../domain/entities/UserRepository');
const PasswordService = require('../../domain/services/PasswordService');
const User = require('../../domain/entities/user');
const { randomUUID } = require('crypto');
const UserPolicy = require('../../domain/policies/UserPolicy');

class RegisterUserUseCase {
  constructor(userRepository, passwordService) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
  }

  async execute({ email, password, role, authUserId, context }) {
    console.log("[REGISTER] Iniciando registro", {
      email,
      role
    });

    try {
      const actor = await this.userRepository.findById(authUserId);

if (!actor) {
  throw new Error("Usuário não encontrado");
}


      // 🔐 AUTORIZAÇÃO PRIMEIRO
  if (!UserPolicy.canRegister(actor, context)) {
    throw new Error("Acesso negado");
  }

      // 🔹 validação inicial
      if (!email || !password) {
        console.warn("[REGISTER] Dados obrigatórios ausentes", {
          email,
          passwordProvided: !!password
        });
        throw new Error("Email e senha são obrigatórios");
      }

      console.log("[REGISTER] Verificando se usuário já existe");
      const exists = await this.userRepository.findByEmail(email);
      console.log("[REGISTER] Resultado findByEmail:", !!exists);

      if (exists) {
        console.warn("[REGISTER] Usuário já existente", { email });
        throw new Error("Usuário já existe");
      }

      // 🔹 validação de role
      const allowedRoles = ["ADMIN", "EMPLOYEE"];
      console.log("[REGISTER] Validando role", { role });

      if (!allowedRoles.includes(role)) {
        console.warn("[REGISTER] Role inválida", { role });
        throw new Error("Role inválida");
      }

      console.log("[REGISTER] Gerando hash da senha");
      const passwordHash = await this.passwordService.hash(password);
      console.log("[REGISTER] Hash gerado com sucesso");

      const user = new User({
  id: randomUUID(),
  email,
  passwordHash,
  role,
  status: 'active'
});

      console.log("[REGISTER] Salvando usuário no banco", {
        email: user.email,
        role: user.role
      });

      await this.userRepository.save(user);

      console.log("[REGISTER] Usuário criado com sucesso", {
        email: user.email,
        role: user.role
      });

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        active: user.active
      };

    } catch (error) {
      console.error("[REGISTER] ERRO NO REGISTRO", {
        message: error.message,
        stack: error.stack
      });

      throw error; // 🔥 importante: não engole o erro
    }
  }
}

module.exports = RegisterUserUseCase;
