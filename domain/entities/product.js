class Product {
  constructor({ name, description, price, image, category }) {
    if (!name || !description || !price || !image || !category) {
      throw new Error("All fields are required");
    }

    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
  }
}

module.exports = Product;
