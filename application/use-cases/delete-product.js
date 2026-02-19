const ProductPolicy = require("../policies/ProductPolicy");
const Product = require("../../domain/entities/product");

class DeleteProducts {
  constructor(productRepo, userRepo) {
    this.productRepo = productRepo;
    this.userRepo = userRepo;
  }

  async execute({ id, userId }) {

    // 🔎 1️⃣ Buscar usuário pelo ID do JWT
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // 🔐 2️⃣ Autorização (Somente ADMIN)
    ProductPolicy.canDelete(user);

    // 📦 3️⃣ Buscar produto
    const productData = await this.productRepo.findById(id);

    if (!productData) {
      throw new Error("Produto não encontrado");
    }

    // 🧠 4️⃣ Recriar entidade rica
    const product = new Product(productData);

    // 🧠 5️⃣ Regra de domínio
    product.canBeDeleted();

    // 🗑 6️⃣ Exclusão
    await this.productRepo.delete(id);

    return {
      message: "Produto deletado com sucesso"
    };
  }
}

module.exports = DeleteProducts;
