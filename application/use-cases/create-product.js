const Product = require("../../domain/entities/product");
const ProductValidator = require("../../domain/entities/productvalidator");
const ProductCreatedEvent = require("../../domain/events/ProductCreatedEvent");

class CreateProduct {
  constructor(productRepo, userRepo, eventDispatcher) {
    this.productRepo = productRepo;
    this.userRepo = userRepo;
    this.eventDispatcher = eventDispatcher;
  }

  async execute({ productData, userId, context }) {
    let user = null;
    let createdProduct = null;

    try {
      // 🔎 1️⃣ Buscar usuário
      user = await this.userRepo.findById(userId);
      if (!user) throw new Error("Usuário não encontrado");

      // 🛡 2️⃣ Validação de dados
      ProductValidator.validate(productData);

      // 🧠 3️⃣ Criar entidade rica
      const product = new Product(productData);

      // 💾 4️⃣ Persistir
      createdProduct = await this.productRepo.create(product);

      // ✅ 5️⃣ Auditoria SUCCESS
      await this.eventDispatcher.dispatch(
        new ProductCreatedEvent({
          entity: "Product",
          entityId: createdProduct.id || createdProduct._id,
          userId: user.id,
          userEmail: user.email,
          newData: createdProduct,
          status: "SUCCESS",
          context
        })
      );

      return createdProduct;

    } catch (error) {

      // 🚨 Auditoria ERROR
      await this.eventDispatcher.dispatch(
        new ProductCreatedEvent({
          entity: "Product",
          entityId: null,
          userId: user?.id,
          userEmail: user?.email,
          newData: productData,
          status: "ERROR",
          context,
          errorMessage: error.message
        })
      );

      throw error;
    }
  }
}

module.exports = CreateProduct;
