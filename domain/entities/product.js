class Product {
  constructor({
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
    // Validação mínima
    if (
      !name || !description || !price ||
      !images || !category || !colors || !tamanhos ||
      stock === undefined || !status
    ) {
      throw new Error("All required fields must be provided");
    }

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
}

module.exports = Product;
