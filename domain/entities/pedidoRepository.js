class PedidoRepository {
  criarPedido(pedidoData) {}

  // Encontrar um pedido por ID
  encontrarPorId(pedidoId) {}

  // Encontrar pedidos por telefone
  encontrarPorTelefone(telefone) {}

  imprimir(textoimpresso) {}

  // Atualizar o status de um pedido
  atualizarStatus(pedidoId, novoStatus) {}

  // Atualizar os dados de um pedido (exceto status)
  atualizarPedido(pedidoId, novoDados) {}

  // Deletar um pedido
  deletarPedido(pedidoId) {}

  // Encontrar todos os pedidos
  encontrarTodos() {}

  // Encontrar pedidos por status
  encontrarPorStatus(status) {}

  // Cancelar um pedido (alterando o status para 'cancelado')
  cancelarPedido(pedidoId) {}
}
