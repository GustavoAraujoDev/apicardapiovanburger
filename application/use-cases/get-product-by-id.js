const Product = require("../../domain/entities/product");
const ProductRepository = require("../../infra/repositories/product-repository");

class GetProductsfindById {
  async execute(id) {
    return await ProductRepository.findById(id);
  }
}

module.exports = GetProductsfindById;
