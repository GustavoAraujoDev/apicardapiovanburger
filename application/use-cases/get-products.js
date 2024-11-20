const Product = require("../../domain/entities/product");
const ProductRepository = require("../../infra/repositories/product-repository");

class GetProducts {
  async execute() {
    return await ProductRepository.findAll();
  }
}

module.exports = GetProducts;
