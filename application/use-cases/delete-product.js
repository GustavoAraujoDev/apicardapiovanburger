const Product = require("../../domain/entities/product");
const ProductRepository = require("../../infra/repositories/product-repository");

class DeleteProducts {
  async execute(id) {
    return await ProductRepository.delete(id);
  }
}

module.exports = DeleteProducts;