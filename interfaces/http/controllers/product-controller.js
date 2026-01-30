const CreateProduct = require("../../../application/use-cases/create-product");
const GetProducts = require("../../../application/use-cases/get-products");
const findById = require("../../../application/use-cases/get-product-by-id");
const DeleteProduct = require("../../../application/use-cases/delete-product");
const Productsupdate = require("../../../application/use-cases/update-product");
const LoginUser = require("../../../application/use-cases/auth/LoginUseCase");
const RegisterUserUseCase = require("../../../application/use-cases/RegisterUserUseCase");
const ProductRepositoryMongo = require("../../../infra/repositories/productRepositoryMongo");
const UserRepositoryMongo = require("../../../infra/repositories/UserRepositoryMongo");
const JwtService = require("../auth/JwtService");
const BcryptPasswordService = require("../security/BcryptPasswordService");
class ProductController {
  async Registrer(req, res) {
    console.log(req.body);
    try {
      const userRepo = new UserRepositoryMongo();
      const registerUser = new RegisterUserUseCase(userRepo, new BcryptPasswordService());
      const product = await registerUser.execute(req.body.email, req.body.password, req.body.role);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async login(req, res) {
    console.log(req.body);
    try {
      const userRepo = new UserRepositoryMongo();
      const loginUser = new LoginUser(userRepo, new BcryptPasswordService(), new JwtService());
      const product = await loginUser.execute(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
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
