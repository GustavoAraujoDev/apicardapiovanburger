const PedidoRepository = require('../../infra/repositories/pedido-repository');

class EncontrarPedidoPorIdUseCase {
  async executar(pedidoId) {
    try {
      const pedido = await PedidoRepository.encontrarPorId(pedidoId);
      return pedido;
    } catch (err) {
      throw new Error('Erro ao encontrar pedido: ' + err.message);
    }
  }
}

module.exports = EncontrarPedidoPorIdUseCase;
