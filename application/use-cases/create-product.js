const Product = require("../../domain/entities/product");
const ProductValidator = require("../../domain/entities/productvalidator")
class CreateProduct {
  constructor(productRepo){
    this.productRepo = productRepo;
  }

  async execute(productData) {
    const product = new Product(productData);
    return await this.productRepo.create(product);
  }
}

module.exports = CreateProduct;
