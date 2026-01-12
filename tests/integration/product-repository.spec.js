const mongoose = require("mongoose");
const { MongoDBContainer } = require("@testcontainers/mongodb");

const { productRepository } = require("../../infra/repositories/product-repository");
const { ProductModel } = require("../../infra/repositories/product-repository");

let container;

describe("Product Repository - Integration", () => {
  beforeAll(async () => {
       container = await new MongoDBContainer().start();
    const uri = container.getConnectionString();
    await mongoose.connect(uri);
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
    };

    const product = await productRepository.create(productData);

    expect(product._id).toBeDefined();
    expect(product.name).toBe("Nike Air");
  });
});
