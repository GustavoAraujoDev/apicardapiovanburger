const Pedido = require("../../domain/entities/Pedido");
class CriarPedidoUseCase {
  constructor(pedidoRepo){
    this.pedidoRepo = pedidoRepo;
  }
   async executar(pedidoData) {
    try {
    console.log("Dados do pedido recebidos:", pedidoData);
    const pedido = new Pedido(pedidoData);
    console.log("Dados do pedido:", pedido);
    const novoPedido = await this.pedidoRepo.criarPedido(pedido);
    console.log("Novo pedido criado:", novoPedido);
    return novoPedido;
    } catch (err) {
      throw new Error('Erro ao criar pedido: ' + err.message);
    }
  }
}

module.exports = CriarPedidoUseCase;
