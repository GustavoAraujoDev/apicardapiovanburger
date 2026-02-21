class ProductPolicy {

  static ensureAuthenticated(user) {
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    if (user.status !== "active") {
      throw new Error("Usuário inativo");
    }
  }

  // 🗑 Deletar produto
  static canDelete({ user, product }) {
    this.ensureAuthenticated(user);

    // Apenas ADMIN pode deletar
    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode deletar produtos");
    }

    // Produto precisa estar inativo
    if (product.status !== "inactive") {
      throw new Error("Produto deve estar inativo para deletar");
    }

    // Produto não pode ter estoque
    if (product.stock > 0) {
      throw new Error("Produto com estoque não pode ser deletado");
    }

    return true;
  }

  // ✏️ Editar dados do produto
  static canEdit({ user, product }) {
    this.ensureAuthenticated(user);

    // ADMIN pode editar qualquer produto
    if (user.role === "ADMIN") return true;

    // EMPLOYEE pode editar apenas produtos ativos
    if (user.role === "EMPLOYEE" && product.status === "active") {
      return true;
    }

    throw new Error("Sem permissão para editar produto");
  }

  // 🛒 Fazer venda (remover estoque)
  static canSell({ user, product, quantity }) {
    this.ensureAuthenticated(user);

    if (!["ADMIN", "EMPLOYEE"].includes(user.role)) {
      throw new Error("Sem permissão para realizar venda");
    }

    if (product.status !== "active") {
      throw new Error("Produto inativo não pode ser vendido");
    }

    if (quantity > product.stock) {
      throw new Error("Estoque insuficiente");
    }

    return true;
  }

  // 📦 Dar entrada (adicionar estoque)
  static canAddStock({ user, product }) {
    this.ensureAuthenticated(user);

    if (!["ADMIN", "EMPLOYEE"].includes(user.role)) {
      throw new Error("Sem permissão para adicionar estoque");
    }

    if (product.status !== "active") {
      throw new Error("Produto inativo não pode receber estoque");
    }

    return true;
  }
}

module.exports = ProductPolicy;
