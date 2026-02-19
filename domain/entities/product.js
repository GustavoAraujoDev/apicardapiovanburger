class Product {
  constructor({
    id,
    name,
    description,
    price,
    images = [],
    category,
    colors = [],
    tamanhos = [],
    stock,
    status,
    priceHistory = []
  }) {

    if (!name || typeof name !== "string") {
      throw new Error("Nome inválido");
    }

    if (!description || typeof description !== "string") {
      throw new Error("Descrição inválida");
    }

    if (typeof price !== "number" || price <= 0) {
      throw new Error("Preço deve ser maior que zero");
    }

    if (!Array.isArray(images)) {
      throw new Error("Images deve ser um array");
    }

    if (!category) {
      throw new Error("Categoria obrigatória");
    }

    if (!Array.isArray(colors)) {
      throw new Error("Colors deve ser um array");
    }

    if (!Array.isArray(tamanhos)) {
      throw new Error("Tamanhos deve ser um array");
    }

    if (typeof stock !== "number" || stock < 0) {
      throw new Error("Estoque inválido");
    }

    if (!["active", "inactive"].includes(status)) {
      throw new Error("Status inválido");
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.category = category;
    this.colors = colors;
    this.tamanhos = tamanhos;
    this.stock = stock;
    this.status = status;
    this.priceHistory = priceHistory;
  }

  // 🧠 Regra: atualizar preço
  updatePrice(newPrice, userId) {
    if (typeof newPrice !== "number" || newPrice <= 0) {
      throw new Error("Novo preço inválido");
    }

    if (newPrice === this.price) {
      throw new Error("Novo preço deve ser diferente do atual");
    }

    this.priceHistory.push({
      oldPrice: this.price,
      newPrice,
      updatedAt: new Date(),
      updatedBy: userId
    });

    this.price = newPrice;
  }

  // 🧠 Regra: adicionar estoque
  addStock(quantity) {
    if (typeof quantity !== "number" || quantity <= 0) {
      throw new Error("Quantidade inválida");
    }

    this.stock += quantity;
  }

  // 🧠 Regra: remover estoque
  removeStock(quantity) {
    if (typeof quantity !== "number" || quantity <= 0) {
      throw new Error("Quantidade inválida");
    }

    if (quantity > this.stock) {
      throw new Error("Estoque insuficiente");
    }

    this.stock -= quantity;
  }

  // 🧠 Regra: desativar produto
  deactivate() {
    if (this.status === "inactive") {
      throw new Error("Produto já está inativo");
    }

    this.status = "inactive";
  }

  // 🧠 Regra: ativar produto
  activate() {
    if (this.status === "active") {
      throw new Error("Produto já está ativo");
    }

    this.status = "active";
  }

  // 🧠 Regra: verificar se pode ser deletado
  canBeDeleted() {
    if (this.stock > 0) {
      throw new Error("Produto com estoque não pode ser deletado");
    }

    if (this.status === "active") {
      throw new Error("Produto ativo deve ser desativado antes de deletar");
    }

    return true;
  }
}

module.exports = Product;
