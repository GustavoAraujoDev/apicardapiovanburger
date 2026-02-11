const mongoose = require("mongoose");
const { MongoDBContainer } = require("@testcontainers/mongodb");

const ProductRepositoryMongo = require("../../infra/repositories/productRepositoryMongo");
const { ProductModel } = require("../../infra/repositories/productRepositoryMongo");

let container;
let productRepositoryMongo;

describe("Product Repository - Integration", () => {
  beforeAll(async () => {
    container = await new MongoDBContainer().start();
    const uri = container.getConnectionString();
    await mongoose.connect(uri);

    productRepositoryMongo = new ProductRepositoryMongo();
  });

  afterEach(async () => {
    // 🔥 Limpa coleção entre testes
    await ProductModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await container.stop();
  });

  it("should create a product in the database", async () => {
    const productData = {
      name: "Nike Air",
      description: "Tênis confortável",
      price: 300,
      images: ["tenis.jpg"],
      category: "Calçados",
      colors: ["Branco"],
      tamanhos: ["42"],
      stock: 10,
      status: "active"
    };

    const product = await productRepositoryMongo.create(productData);

    // 🔹 Validação da entidade retornada
    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    expect(typeof product.id).toBe("string");
    expect(product.name).toBe("Nike Air");
    expect(product.stock).toBe(10);
    expect(product.status).toBe("active");

    // 🔹 Validação real no banco
    const saved = await ProductModel.findOne({ name: "Nike Air" }).lean();

    expect(saved).toBeTruthy();
    expect(saved.name).toBe("Nike Air");
    expect(saved.price).toBe(300);
    expect(saved.stock).toBe(10);
  });
});
