const CreateProduct = require("../../../application/use-cases/create-product");
const GetProducts = require("../../../application/use-cases/get-products");

class ProductController {
  async create(req, res) {
    try {
      const createProduct = new CreateProduct();
      const product = await createProduct.execute(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const getProducts = new GetProducts();
      const products = await getProducts.execute();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Métodos para update, delete e getById seguem o mesmo padrão.
}

module.exports = new ProductController();
