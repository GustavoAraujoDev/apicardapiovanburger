class ProductValidator{
    static validate(product){
        if (!product.name || product.name.length < 3) {
            throw new Error("nome inválido"); 
        }
        if (product.price <= 0) {
            throw new Error("Preço inválido");
        }
        if (!product.category) {
            throw new Error("Categoria Obrigatória!");
        }
    }
}

module.exports = ProductValidator;