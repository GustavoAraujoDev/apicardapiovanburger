class Product {
  constructor({ name, description, price, images = [], category, colors = [], tamanhos = [] }) {
    if (!name || !description || !price || !images || !category || !colors || !tamanhos) {
      throw new Error("All fields are required");
    }

    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.category = category;
    this.colors = colors;
    this.tamanhos = tamanhos;
  }
}

module.exports = Product;
