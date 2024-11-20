class Product {
  constructor({ name, description, price, image }) {
    if (!name || !description || !price || !image) {
      throw new Error("All fields are required");
    }

    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

module.exports = Product;
