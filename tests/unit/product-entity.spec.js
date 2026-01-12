const Product = require("../../domain/entities/product");

describe("Product Entity", () => {
  it("should create a valid product entity", () => {
    const data = {
      name: "Camisa Nike",
      description: "Camisa seca rápido",
      price: 120.5,
      images: ["img1.jpg"],
      category: "Roupas",
      colors: ["Preto"],
      tamanhos: ["M"]
    };

    const product = new Product(data);

    expect(product.name).toBe(data.name);
    expect(product.category).toBe("Roupas");
  });

  it("should throw error when missing fields", () => {
    expect(() => {
      new Product({});
    }).toThrow("All fields are required");
  });
});
