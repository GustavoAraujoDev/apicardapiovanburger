const CreateProduct = require("../../../application/use-cases/create-product");
const GetProducts = require("../../../application/use-cases/get-products");
const findById = require("../../../application/use-cases/get-product-by-id");
const DeleteProducts = require("../../../application/use-cases/delete-product");
const Productsupdate = require("../../../application/use-cases/update-product");
const LoginUserUseCase = require("../../../application/use-cases/auth/LoginUserUseCase");
const RegisterUserUseCase = require("../../../application/use-cases/RegisterUserUseCase");
const ListUsersUseCase = require("../../../application/use-cases/ListUsersUseCase");
const SellProduct = require("../../../application/use-cases/SellProduct");
const StockAddProduct = require("../../../application/use-cases/StockAddProduct");
const { ProductRepositoryMongo } = require("../../../infra/repositories/productRepositoryMongo");
const AuditRepositoryMongo = require("../../../infra/repositories/AuditRepositoryMongo")
const { UserRepositoryMongo } = require("../../../infra/repositories/UserRepositoryMongo");
const JwtService = require("../auth/JwtService");
const BcryptPasswordService = require("../security/BcryptPasswordService");
const UserBlocked = require('../../../domain/events/UserBlocked');
const UserLoggedIn = require('../../../domain/events/UserLoggedIn');
const { eventDispatcher } = require('../../../bootstrap/container');
const ListAuditLogs = require("../../../application/use-cases/ListAuditLogs");

class ProductController {
async addStock(req, res) {
  console.log("====================================");
  console.log("🔥 [ADD STOCK] ROTA CHAMADA");
  console.log("📅 Data:", new Date().toISOString());
  console.log("📌 Params:", req.params);
  console.log("📦 Body:", req.body);
  console.log("👤 User:", req.user);
  console.log("🌍 IP:", req.ip);
  console.log("🖥 UserAgent:", req.headers["user-agent"]);
  console.log("====================================");

  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!req.user) {
      console.error("❌ req.user está undefined");
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userId = req.user.id;

    if (!quantity || Number(quantity) <= 0) {
      console.error("❌ Quantidade inválida:", quantity);
      return res.status(422).json({ error: "Quantidade inválida" });
    }

    const context = {
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    };

    console.log("🔎 Criando repositórios...");
    const userRepo = new UserRepositoryMongo();
    const repo = new ProductRepositoryMongo();

    if (!eventDispatcher) {
      console.error("❌ eventDispatcher está undefined");
    }

    console.log("🚀 Executando use case SellProduct...");

    const stockAddProduct = new StockAddProduct(repo, userRepo, eventDispatcher);

    const result = await stockAddProduct.execute({
      productId: id,
      quantity: Number(quantity),
      userId,
      context
    });

    console.log("✅ stock atualizado com sucesso:", result);

    return res.status(200).json(result);

  } catch (error) {
    console.error("====================================");
    console.error("💥 ERRO NO ADD STOCK");
    console.error("Mensagem:", error.message);
    console.error("Stack:", error.stack);
    console.error("====================================");

    return res.status(500).json({
      error: "Erro interno ao realizar venda",
      message: error.message,   // ✅ aqui
      stack: error.stack 
    });
  }
}
  
  async sell(req, res) {
  console.log("====================================");
  console.log("🔥 [SELL] ROTA CHAMADA");
  console.log("📅 Data:", new Date().toISOString());
  console.log("📌 Params:", req.params);
  console.log("📦 Body:", req.body);
  console.log("👤 User:", req.user);
  console.log("🌍 IP:", req.ip);
  console.log("🖥 UserAgent:", req.headers["user-agent"]);
  console.log("====================================");

  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!req.user) {
      console.error("❌ req.user está undefined");
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userId = req.user.id;

    if (!quantity || Number(quantity) <= 0) {
      console.error("❌ Quantidade inválida:", quantity);
      return res.status(422).json({ error: "Quantidade inválida" });
    }

    const context = {
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    };

    console.log("🔎 Criando repositórios...");
    const userRepo = new UserRepositoryMongo();
    const repo = new ProductRepositoryMongo();

    if (!eventDispatcher) {
      console.error("❌ eventDispatcher está undefined");
    }

    console.log("🚀 Executando use case SellProduct...");

    const sellProduct = new SellProduct(repo, userRepo, eventDispatcher);

    const result = await sellProduct.execute({
      productId: id,
      quantity: Number(quantity),
      userId,
      context
    });

    console.log("✅ Venda realizada com sucesso:", result);

    return res.status(200).json(result);

  } catch (error) {
    console.error("====================================");
    console.error("💥 ERRO NO SELL");
    console.error("Mensagem:", error.message);
    console.error("Stack:", error.stack);
    console.error("====================================");

    return res.status(500).json({
      error: "Erro interno ao realizar venda",
      message: error.message,   // ✅ aqui
      stack: error.stack 
    });
  }
}
  
  async Registrer(req, res) {
    try {
      const authUserId = req.user?.id; // 🔐 vem do JWT validado

    if (!authUserId) {
      return res.status(401).json({
        error: "Não autenticado"
      });
    }
      
      const { email, password, role } = req.body;

      // ✅ Validação básica (camada HTTP)
      if (!email || !password) {
        return res.status(422).json({
          error: "Email e senha são obrigatórios"
        });
      }
      const context = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      mfaValidated: true, // aqui viria de um MFA real
      sessionAgeMinutes: 2
    };

      const userRepo = new UserRepositoryMongo();
      const passwordService = new BcryptPasswordService();
      const registerUser = new RegisterUserUseCase(userRepo, passwordService);

      const user = await registerUser.execute({
        authUserId,
        context,
        email,
        password,
        role
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user
      });

    } catch (error) {
      console.error("REGISTER_USER_ERROR:", error);

      // ✅ erro de regra de negócio
      if (error.message?.includes("já existe")) {
        return res.status(409).json({ error: error.message });
      }

      return res.status(500).json({
        error: "Erro interno ao criar usuário",
        message: error.message,   // ✅ aqui
        stack: error.stack  
      });
    }
  }

  async login(req, res) {
  console.log("[LOGIN_CONTROLLER] Request recebida");
  console.log("[LOGIN] JWT_SECRET:", process.env.JWT_SECRET);
  try {
    const { email, password } = req.body;
    console.log("[LOGIN_CONTROLLER] Email recebido:", email);

    if (!email || !password) {
      return res.status(422).json({
        error: "Email e senha são obrigatórios"
      });
    }

    const context = {
  ip: req.ip,
  userAgent: req.headers['user-agent'],
  deviceTrusted: true,        // vindo de um DeviceService
  mfaValidated: true,        // ou true se validado
  sessionAgeMinutes: 0,
  time: {
    isBusinessHours: () => true
  }
};

    const userRepo = new UserRepositoryMongo();
    const passwordService = new BcryptPasswordService();
    const jwtService = new JwtService();

    const loginUser = new LoginUserUseCase(
      userRepo,
      passwordService,
      jwtService,
      eventDispatcher
    );

    const auth = await loginUser.execute({ email, password, context });

    console.log("[LOGIN_CONTROLLER] Login OK");
    return res.status(200).json(auth);

  } catch (error) {
    console.error("[LOGIN_CONTROLLER_ERROR]", error);

    if (error.message?.includes("Credenciais")) {
      return res.status(401).json({
        error: "Email ou senha inválidos"
      });
    }

    return res.status(500).json({
      error: "Erro interno ao realizar login",
      message: error.message,   // ✅ aqui
      stack: error.stack        // opcional, só pra debug
    });
  }
}

  async create(req, res) {
  // 🔹 Log inicial para depuração no Render
  console.log("[ProductController.create] Requisição recebida:", {
    body: req.body,
    headers: req.headers,
    time: new Date().toISOString()
  });

  try {
    // 🔹 Inicializa o repositório e caso de uso
    const userRepo = new UserRepositoryMongo();
    const repo = new ProductRepositoryMongo();
    const createProduct = new CreateProduct(repo, userRepo, eventDispatcher);

    // 🔹 Validação extra opcional antes de criar (pode ser útil para logs)
    if (!req.body || Object.keys(req.body).length === 0) {
      console.warn("[ProductController.create] req.body está vazio!");
      return res.status(400).json({ error: "O corpo da requisição está vazio" });
    }

    // 🔐 Contexto de segurança (auditoria)
    const context = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      deviceTrusted: true,
      mfaValidated: false,
      sessionAgeMinutes: 0,
      time: {
        isBusinessHours: true
      }
    };

    const product = await createProduct.execute({
      productData: req.body,
      userId: req.user.id,
      context
    });

    // 🔹 Log de sucesso
    console.log("[ProductController.create] Produto criado com sucesso:", {
      productId: product._id,
      name: product.name,
      time: new Date().toISOString()
    });

    // 🔹 Retorna produto criado
    return res.status(201).json(product);
  } catch (error) {
    // 🔹 Log detalhado do erro
    console.error("[ProductController.create] Erro ao criar produto:", {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString()
    });

    // 🔹 Retorna mensagem amigável
    return res.status(400).json({ error: error.message });
  }
}

  async getAll(req, res) {
    try {
      const repo = new ProductRepositoryMongo();
      const getProducts = new GetProducts(repo);
      const products = await getProducts.execute();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    const {id} = req.params;
    try {
      const repo = new ProductRepositoryMongo();
      const findByIdproduct = new findById(repo);
      const products = await findByIdproduct.execute(id);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
  const { id } = req.params;
  const userId = req.user?.id; // vindo do JWT middleware

  try {
    const productRepo = new ProductRepositoryMongo();
    const userRepo = new UserRepositoryMongo();

    const deleteProduct = new DeleteProducts(productRepo, userRepo, eventDispatcher);
    const context = {
  ip: req.ip,
  userAgent: req.headers["user-agent"]
};
    const result = await deleteProduct.execute({
      id,
      userId,
      context
    });

    return res.status(200).json(result);

  } catch (error) {

    // 🔐 Autorização
    if (error.message.includes("ADMIN") || 
        error.message.includes("Usuário inativo")) {
      return res.status(403).json({ error: error.message });
    }

    // 🔎 Não encontrado
    if (error.message.includes("não encontrado")) {
      return res.status(404).json({ error: error.message });
    }

    // 📌 Regra de negócio
    if (error.message.includes("estoque") ||
        error.message.includes("ativo")) {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

   async update(req, res) {
    console.log(req.body);
    try {
      const repo = new ProductRepositoryMongo();
      const Productsupdate = new Productsupdate(repo);
      const product = await Productsupdate.execute(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listAudit(req, res) {
  try {
    const userRepo = new UserRepositoryMongo();
    const AuditRepository = new AuditRepositoryMongo();
    const listAuditLogsUseCase = new ListAuditLogs(
  AuditRepository,
  userRepo
);
    const result = await listAuditLogsUseCase.execute({
      userId: req.user.id,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20
    });

    return res.status(200).json(result);

  } catch (error) {
    return res.status(403).json({
      error: error.message
    });
  }
}

   /**
   * Listar todos os usuários
   * @param {*} req 
   * @param {*} res 
   */
  async listAll(req, res) {
    try {
      const userRepo = new UserRepositoryMongo();
      const listUsersUseCase = new ListUsersUseCase(userRepo);
      const users = await listUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ 
        error: "Erro interno do servidor", 
        message: error.message,   // ✅ aqui
        stack: error.stack   
      });
    }
  }
  // Métodos para update, delete e getById seguem o mesmo padrão.
}

module.exports = new ProductController();
