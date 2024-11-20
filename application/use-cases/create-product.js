const Product = require("../../domain/entities/product");
const ProductRepository = require("../../infra/repositories/product-repository");

class CreateProduct {
  async execute(productData) {
    const product = new Product(productData);
    return await ProductRepository.create(product);
  }
}

module.exports = CreateProduct;
