const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoDBContainer } = require("@testcontainers/mongodb");

const app = require("../../app-test");

let container;

describe("Product Routes - E2E", () => {
  beforeAll(async () => {
  container = await new MongoDBContainer().start();
  const uri = container.getConnectionString();
  await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await container.stop();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Relógio",
        description: "Relógio resistente à água",
        price: 250,
        images: ["relogio.jpg"],
        category: "Acessórios",
        colors: ["Preto"],
        tamanhos: ["U"],
        stock: 10,
        status: "active"
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Relógio");
  });

  it("should get all products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
