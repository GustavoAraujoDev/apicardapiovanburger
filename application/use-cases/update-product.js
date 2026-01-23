const Product = require("../../domain/entities/product");

class Productsupdate {
    constructor(productRepo){
    this.productRepo = productRepo;
  }
  async execute(id) {
    return await this.productRepo.update(id);
  }
}

module.exports = GetProductsfindById;