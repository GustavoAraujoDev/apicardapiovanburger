const Product = require("../../domain/entities/product");
const { productRepository } = require("../../infra/repositories/product-repository");

class GetProducts {
  async execute() {
    return await productRepository.findAll();
  }
}

module.exports = GetProducts;
