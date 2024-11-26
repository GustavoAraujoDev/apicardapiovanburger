const PedidoRepository = require('../../infra/repositories/pedido-repository');

class AtualizarStatusPedidoUseCase {
   async executar(pedidoId, novoStatus) {
    try {
      const pedidoAtualizado = await PedidoRepository.atualizarStatus(pedidoId, novoStatus);
      return pedidoAtualizado;
    } catch (err) {
      throw new Error('Erro ao atualizar status do pedido: ' + err.message);
    }
  }
}

module.exports = AtualizarStatusPedidoUseCase;
