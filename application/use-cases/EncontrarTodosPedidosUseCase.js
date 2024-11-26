const PedidoRepository = require('../../infra/repositories/pedido-repository');

class EncontrarTodosPedidosUseCase {
  async executar() {
    try {
      const pedidos = await PedidoRepository.encontrarTodos();
      return pedidos;
    } catch (err) {
      throw new Error('Erro ao encontrar pedido: ' + err.message);
    }
  }
}

module.exports = EncontrarTodosPedidosUseCase;
