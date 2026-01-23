const Product = require("../../domain/entities/product");


class DeleteProducts {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }
  async execute(id) {
    return await this.productRepo.delete(id);
  }
}

module.exports = DeleteProducts;
