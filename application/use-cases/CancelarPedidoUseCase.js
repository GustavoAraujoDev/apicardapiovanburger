const PedidoRepository = require('../../infra/repositories/pedido-repository');

class CancelarPedidoUseCase {
  async executar(pedidoId) {
    try {
      const pedidoCancelado = await PedidoRepository.cancelarPedido(pedidoId);
      return pedidoCancelado;
    } catch (err) {
      throw new Error('Erro ao cancelar pedido: ' + err.message);
    }
  }
}

module.exports = CancelarPedidoUseCase;
