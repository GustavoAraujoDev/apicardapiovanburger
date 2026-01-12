const Product = require("../../domain/entities/product");
const { productRepository } = require("../../infra/repositories/product-repository");

class CreateProduct {
  async execute(productData) {
    const product = new Product(productData);
    return await productRepository.create(product);
  }
}

module.exports = CreateProduct;
