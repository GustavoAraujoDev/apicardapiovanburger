const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: { type: String, required: true }, // Novo campo
  colors: [{ type: String, required: true }],
  tamanhos: [{type: String, required: true }],
});

const ProductModel = mongoose.model("Product", ProductSchema);

class ProductRepository {
  async create(productData) {
    return await ProductModel.create(productData);
  }

  async findAll() {
    return await ProductModel.find();
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async update(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

module.exports = new ProductRepository();
