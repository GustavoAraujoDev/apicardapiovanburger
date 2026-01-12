const Product = require("../../domain/entities/product");
const { productRepository } = require("../../infra/repositories/product-repository");

class GetProductsfindById {
  async execute(id) {
    return await productRepository.findById(id);
  }
}

module.exports = GetProductsfindById;
