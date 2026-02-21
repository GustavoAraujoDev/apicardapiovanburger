class ProductPolicy {

  static ensureAuthenticated(user) {
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    if (user.status !== "active") {
      throw new Error("Usuário inativo");
    }
  }

  static canDelete(user) {
    this.ensureAuthenticated(user);

    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode deletar produtos");
    }
  }

  static canUpdate(user) {
    this.ensureAuthenticated(user);

    if (!["ADMIN", "EMPLOYEE"].includes(user.role)) {
      throw new Error("Sem permissão para atualizar produto");
    }
  }
}

module.exports = ProductPolicy;
