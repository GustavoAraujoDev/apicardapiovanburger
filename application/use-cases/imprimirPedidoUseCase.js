const Pedido = require('../../domain/entities/Pedido');
const PedidoRepository = require('../../infra/repositories/pedido-repository');

class ImprimirPedidoUseCase {

  async executar(pedidoData) {
    try {
      // Logando os dados do pedido para verificar se está chegando corretamente
      console.log('Dados recebidos para impressão:', pedidoData);
      
      // Criando a instância do Pedido
      const pedido = new Pedido(pedidoData);
      console.log('Pedido criado:', pedido);

      // Formatando para impressão
      const textoParaImpressao = pedido.formatarParaImpressao();
      console.log('Texto formatado para impressão:', textoParaImpressao);

      // Chamando o repositório para imprimir
      const textoimpresso = await PedidoRepository.imprimir(textoParaImpressao);
      console.log('Texto impresso:', textoimpresso);

      return textoimpresso;
    } catch (err) {
      console.error('Erro ao imprimir pedido: ' + err.message);
      throw new Error('Erro ao imprimir pedido: ' + err.message);
    }
  }
}

module.exports = ImprimirPedidoUseCase;
