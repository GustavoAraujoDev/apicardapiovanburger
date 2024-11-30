const Pedido = require("../../domain/entities/Pedido");
const PedidoRepository = require("../../infra/repositories/pedido-repository");

class ImprimirPedidoUseCase {
  async executar(pedidoData) {
    try {
      // Criando a instância do Pedido
      const pedido = new Pedido(pedidoData);

      // Formatando para impressão
      const textoParaImpressao = pedido.formatarParaImpressao();
      // Chamando o repositório para imprimir
      const textoimpresso = await PedidoRepository.imprimir(textoParaImpressao);

      return textoimpresso;
    } catch (err) {
      console.error("Erro ao imprimir pedido: " + err.message);
      throw new Error("Erro ao imprimir pedido: " + err.message);
    }
  }
}

module.exports = ImprimirPedidoUseCase;
