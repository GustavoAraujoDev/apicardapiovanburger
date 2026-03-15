const request = require("supertest");
const mongoose = require("mongoose");
const { MongoDBContainer } = require("@testcontainers/mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const app = require("../../app-test");
// Importamos o UserModel para manipulação direta na infra de teste
const { UserModel } = require("../../infra/repositories/UserRepositoryMongo");

describe("Product Routes - E2E (Senior Pattern)", () => {
  let container;
  let authToken;

  // Dados de teste isolados
  const testUser = {
    id: uuidv4(),
    email: "admin-test@clinicintelligent.com.br",
    passwordRaw: "Admin@123",
    role: "ADMIN" // Conforme seu domínio
  };

  beforeAll(async () => {
    // 1. Sobe um banco MongoDB novo e limpo no Docker
    container = await new MongoDBContainer("mongo:7").start();
    const uri = container.getConnectionString();
    await mongoose.connect(uri, { directConnection: true });

    // 2. Seed: Criar usuário diretamente via Model de Infra
    // Usamos salt 1 para o teste ser mais rápido que em produção
    const passwordHash = await bcrypt.hash(testUser.passwordRaw, 1);
    
    await UserModel.create({
      id: testUser.id,
      email: testUser.email,
      passwordHash: passwordHash,
      role: testUser.role,
      status: 'active'
    });

    // 3. Login Real: Garante que o AuthMiddleware e o JWT estão integrados
    const loginRes = await request(app)
      .post("/products/login")
      .send({
        email: testUser.email,
        password: testUser.passwordRaw
      });

    authToken = loginRes.body.token;
  }, 40000); // Timeout maior para o Docker subir

  afterAll(async () => {
    await mongoose.disconnect();
    if (container) await container.stop(); // Destrói o banco e o container
  });

  afterEach(async () => {
    // Limpa apenas a coleção de produtos entre cada teste
    // Mantém o usuário e o token válidos para o próximo 'it'
    await mongoose.connection.collection("products").deleteMany({});
  });

  describe("POST /products", () => {
    const validProduct = {
      name: "Relógio Digital Premium",
      description: "Resistente à água e com notificações",
      price: 299.90,
      images: ["relogio.jpg"],
      category: "Acessórios",
      colors: ["Black"],
      tamanhos: ["U"],
      stock: 15,
      status: "active"
    };

    it("should create a product when user is authenticated", async () => {
      const { status, body } = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validProduct);

      expect(status).toBe(201);
      expect(body).toMatchObject({
        name: validProduct.name,
        price: validProduct.price
      });
      expect(body).toHaveProperty("_id");
    });

    it("should return 401 (Unauthorized) when token is missing", async () => {
      const { status } = await request(app)
        .post("/products")
        .send(validProduct);

      expect(status).toBe(401);
    });
  });

  describe("GET /products", () => {
    it("should return an empty list when no products exist", async () => {
      const { status, body } = await request(app)
        .get("/products")
        .set("Authorization", `Bearer ${authToken}`);

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });

    it("should list all products currently in database", async () => {
      // Mock de produto via request para garantir que há algo para listar
      await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${authToken}`)
        .send(validProduct);

      const { status, body } = await request(app)
        .get("/products")
        .set("Authorization", `Bearer ${authToken}`);

      expect(status).toBe(200);
      expect(body.length).toBe(1);
    });
  });
});
