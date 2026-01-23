
class EncontrarPedidosPorTelefoneUseCase {
  constructor(pedidoRepo){
    this.pedidoRepo = pedidoRepo;
  }
  async executar(telefone) {
    try {
      const pedidos = await this.pedidoRepo.encontrarPorTelefone(telefone);
      return pedidos;
    } catch (err) {
      throw new Error('Erro ao encontrar pedidos pelo telefone: ' + err.message);
    }
  }
}

module.exports = EncontrarPedidosPorTelefoneUseCase;
