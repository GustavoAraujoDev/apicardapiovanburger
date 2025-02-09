class Product {
  constructor({ name, description, price, images = [], category }) {
    if (!name || !description || !price || !images || !category) {
      throw new Error("All fields are required");
    }

    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.category = category;
  }
}

module.exports = Product;
