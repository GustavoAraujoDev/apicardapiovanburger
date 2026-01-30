const Product = require("../../domain/entities/product");

class Productsupdate {
    constructor(productRepo){
    this.productRepo = productRepo;
  }
  async execute(id, productData) {
    return await this.productRepo.update(id, productData);
  }
}

module.exports = Productsupdate;