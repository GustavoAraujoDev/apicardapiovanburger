jest.mock("../../infra/repositories/productRepositoryMongo");

const { productRepositoryMongo } = require("../../infra/repositories/productRepositoryMongo");
const CreateProduct = require("../../application/use-cases/create-product");

describe("CreateProduct Use Case", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create product successfully", async () => {
    productRepositoryMongo.create.mockResolvedValue({
      id: "123",
      name: "Camisa",
    });

    const useCase = new CreateProduct();

    const result = await useCase.execute({
      name: "Camisa",
      description: "Camisa top",
      price: 100,
      images: ["img.jpg"],
      category: "Roupas",
      colors: ["Preto"],
      tamanhos: ["M"],
      stock: 10,
      status: "active"
    });

    expect(result.id).toBe("123");
    expect(productRepositoryMongo.create).toHaveBeenCalled();
  });
});
