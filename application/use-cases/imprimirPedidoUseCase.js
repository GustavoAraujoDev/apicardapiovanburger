const Pedido = require("../../domain/entities/Pedido");

class ImprimirPedidoUseCase {
  constructor(pedidoRepo){
    this.pedidoRepo = pedidoRepo;
  }
  async executar(pedidoData) {
    try {
      // Criando a instância do Pedido
      const pedido = new Pedido(pedidoData);

      // Formatando para impressão
      const textoParaImpressao = pedido.formatarParaImpressao();
      // Chamando o repositório para imprimir
      const textoimpresso = await this.pedidoRepo.imprimir(textoParaImpressao);

      return textoimpresso;
    } catch (err) {
      console.error("Erro ao imprimir pedido: " + err.message);
      throw new Error("Erro ao imprimir pedido: " + err.message);
    }
  }
}

module.exports = ImprimirPedidoUseCase;
