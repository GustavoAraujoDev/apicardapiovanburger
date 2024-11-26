const Pedido = require('../../domain/entities/Pedido');
const PedidoRepository = require('../../infra/repositories/pedido-repository');

class ImprimirPedidoUseCase {

  async executar(pedidoData){
    try{
    const pedido = new Pedido(pedidoData);
    const textoParaImpressao = pedido.formatarParaImpressao();
    const textoimpresso = await PedidoRepository.imprimir(textoParaImpressao);
    return textoimpresso;
    }  catch (err) {
      console.error('Erro ao imprimir pedido: ' + err.message )
        throw new Error('Erro ao imprimir pedido: ' + err.message);
      }
  }
}
module.exports =  ImprimirPedidoUseCase