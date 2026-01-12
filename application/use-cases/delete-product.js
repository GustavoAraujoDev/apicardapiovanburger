const Product = require("../../domain/entities/product");
const { productRepository } = require("../../infra/repositories/product-repository");

class DeleteProducts {
  async execute(id) {
    return await productRepository.delete(id);
  }
}

module.exports = DeleteProducts;