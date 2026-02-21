const ProductRepository = require("../../domain/entities/productReposity")
/** @type {*} */
const mongoose = require("mongoose");

/** @type {*} */
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
  colors: [{ type: String, required: true }],
  tamanhos: [{ type: String, required: true }],
  stock: { type: Number, required: true },
  status: { type: String, required: true },
  priceHistory: { type: Array, default: [] } // Mantém histórico
}, { timestamps: true });

/** @type {*} */
const ProductModel = mongoose.model("Product", ProductSchema);

/**
 *
 *
 * @class ProductRepository
 */
class ProductRepositoryMongo extends ProductRepository {
  /**
   *
   *
   * @param {*} productData
   * @return {*} 
   * @memberof ProductRepository
   */
  async create(productData) {
    return await ProductModel.create(productData);
  }

  /**
   *
   *
   * @return {*} 
   * @memberof ProductRepository
   */
  async findAll() {
    return await ProductModel.find();
  }

  /**
   *
   *
   * @param {*} id
   * @return {*} 
   * @memberof ProductRepository
   */
  async findById(id) {
  const product = await ProductModel.findById(id).lean();

  if (!product) return null;

  return {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    status: product.status,
    images: product.images,
    category: product.category,
    colors: product.colors,
    tamanhos: product.tamanhos,
    priceHistory: product.priceHistory
  };
}

  async findByEmail(email) {
    return await ProductModel.findOne({ email });
  }

  /**
   *
   *
   * @param {*} id
   * @param {*} productData
   * @return {*} 
   * @memberof ProductRepository
   */
  async update(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  /**
   *
   *
   * @param {*} id
   * @return {*} 
   * @memberof ProductRepository
   */
  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

module.exports = {
  ProductRepositoryMongo: ProductRepositoryMongo,
  ProductModel
}
