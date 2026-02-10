const CreateProduct = require("../../../application/use-cases/create-product");
const GetProducts = require("../../../application/use-cases/get-products");
const findById = require("../../../application/use-cases/get-product-by-id");
const DeleteProduct = require("../../../application/use-cases/delete-product");
const Productsupdate = require("../../../application/use-cases/update-product");
const LoginUserUseCase = require("../../../application/use-cases/auth/LoginUserUseCase");
const RegisterUserUseCase = require("../../../application/use-cases/RegisterUserUseCase");
const { ProductRepositoryMongo } = require("../../../infra/repositories/productRepositoryMongo");
const { UserRepositoryMongo } = require("../../../infra/repositories/UserRepositoryMongo");
const JwtService = require("../auth/JwtService");
const BcryptPasswordService = require("../security/BcryptPasswordService");
const UserBlocked = require('../../../domain/events/UserBlocked');
const UserLoggedIn = require('../../../domain/events/UserLoggedIn');
// Events
const eventDispatcher = new EventDispatcher();


class ProductController {
  async Registrer(req, res) {
    try {
      const { email, password, role } = req.body;

      // ✅ Validação básica (camada HTTP)
      if (!email || !password) {
        return res.status(422).json({
          error: "Email e senha são obrigatórios"
        });
      }

      const userRepo = new UserRepositoryMongo();
      const passwordService = new BcryptPasswordService();
      const registerUser = new RegisterUserUseCase(userRepo, passwordService);

      const user = await registerUser.execute({
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
        error: "Erro interno ao criar usuário"
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
  mfaValidated: false,        // ou true se validado
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
      error: "Erro interno ao realizar login"
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
    const repo = new ProductRepositoryMongo();
    const createProduct = new CreateProduct(repo);

    // 🔹 Validação extra opcional antes de criar (pode ser útil para logs)
    if (!req.body || Object.keys(req.body).length === 0) {
      console.warn("[ProductController.create] req.body está vazio!");
      return res.status(400).json({ error: "O corpo da requisição está vazio" });
    }

    // 🔹 Criação do produto
    const product = await createProduct.execute(req.body);

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
    const {id} = req.params;
    try {
      const repo = new ProductRepositoryMongo();
      const deleteProduct = new DeleteProduct(repo);
      const products = await deleteProduct.execute(id);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
  // Métodos para update, delete e getById seguem o mesmo padrão.
}

module.exports = new ProductController();
