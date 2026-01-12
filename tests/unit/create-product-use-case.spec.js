jest.mock("../../infra/repositories/product-repository");

const { productRepository } = require("../../infra/repositories/product-repository");
const CreateProduct = require("../../application/use-cases/create-product");

describe("CreateProduct Use Case", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create product successfully", async () => {
    productRepository.create.mockResolvedValue({
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
    });

    expect(result.id).toBe("123");
    expect(productRepository.create).toHaveBeenCalled();
  });
});
