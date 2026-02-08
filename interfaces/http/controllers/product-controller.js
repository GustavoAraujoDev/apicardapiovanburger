const CreateProduct = require("../../../application/use-cases/create-product");
const GetProducts = require("../../../application/use-cases/get-products");
const findById = require("../../../application/use-cases/get-product-by-id");
const DeleteProduct = require("../../../application/use-cases/delete-product");
const Productsupdate = require("../../../application/use-cases/update-product");
const LoginUserUseCase = require("../../../application/use-cases/auth/LoginUserUseCase");
const RegisterUserUseCase = require("../../../application/use-cases/RegisterUserUseCase");
const ProductRepositoryMongo = require("../../../infra/repositories/productRepositoryMongo");
const { UserRepositoryMongo } = require("../../../infra/repositories/UserRepositoryMongo");
const JwtService = require("../auth/JwtService");
const BcryptPasswordService = require("../security/BcryptPasswordService");
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
    try {
      const { email, password } = req.body;

      // ✅ Validação básica
      if (!email || !password) {
        return res.status(422).json({
          error: "Email e senha são obrigatórios"
        });
      }

      const userRepo = new UserRepositoryMongo();
      const passwordService = new BcryptPasswordService();
      const jwtService = new JwtService();

      const loginUser = new LoginUserUseCase(
        userRepo,
        passwordService,
        jwtService
      );

      const auth = await loginUser.execute({
        email,
        password
      });

      return res.status(200).json(auth);

    } catch (error) {
      console.error("LOGIN_ERROR:", error);

      // ✅ credenciais inválidas
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
    console.log(req.body);
    try {
      const repo = new ProductRepositoryMongo();
      const createProduct = new CreateProduct(repo);
      const product = await createProduct.execute(req.body);
      return res.status(201).json(product);
    } catch (error) {
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
