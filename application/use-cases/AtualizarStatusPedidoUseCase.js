class AtualizarStatusPedidoUseCase {
  constructor(pedidoRepo){
    this.pedidoRepo = pedidoRepo;
  }
   async executar(pedidoId, novoStatus) {
    try {
      const pedidoAtualizado = await this.pedidoRepo.atualizarStatus(pedidoId, novoStatus);
      return pedidoAtualizado;
    } catch (err) {
      throw new Error('Erro ao atualizar status do pedido: ' + err.message);
    }
  }
}

module.exports = AtualizarStatusPedidoUseCase;
