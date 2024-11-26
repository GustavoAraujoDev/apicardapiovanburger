const PedidoRepository = require('../../infra/repositories/pedido-repository');

class EncontrarPedidosPorTelefoneUseCase {
  async executar(telefone) {
    try {
      const pedidos = await PedidoRepository.encontrarPorTelefone(telefone);
      return pedidos;
    } catch (err) {
      throw new Error('Erro ao encontrar pedidos pelo telefone: ' + err.message);
    }
  }
}

module.exports = EncontrarPedidosPorTelefoneUseCase;
