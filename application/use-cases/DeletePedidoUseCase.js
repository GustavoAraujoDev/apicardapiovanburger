const PedidoRepository = require('../../infra/repositories/pedido-repository');

class DeletePedidoUseCase {
  async executar(pedidoId) {
    try {
      const pedidoDeletado = await PedidoRepository.deletarPedido(pedidoId);
      return pedidoDeletado;
    } catch (err) {
      throw new Error('Erro ao Delete pedido: ' + err.message);
    }
  }
}

module.exports = DeletePedidoUseCase;
