class Pedido {
  constructor({
    cliente,
    itens,
    pagamento,
    modoEntrega,
    mesa = null,
    horarioEntrega = 120,
    status = 'em preparo',
    rastreamento = { statusRastreamento: 'aguardando', codigoRastreamento: null },
    dataPedido = new Date(),
  }) {
    if (!cliente || !cliente.nome || !cliente.telefone) {
      throw new Error("Informações do cliente são obrigatórias (nome e telefone).");
    }

    if (!Array.isArray(itens) || itens.length === 0) {
      throw new Error("O pedido deve conter pelo menos um item.");
    }

    itens.forEach(item => {
      if (!item.name || !item.category || !item.Quantity || !item.price) {
        throw new Error("Todos os itens devem conter nome, categoria, quantidade e preço.");
      }
    });

    if (!pagamento || !pagamento.forma || !pagamento.valorTotal || pagamento.valorTotal <= 0) {
      throw new Error("Forma de pagamento e valor total são obrigatórios.");
    }

    if (!modoEntrega || !['entrega em casa', 'consumo no local'].includes(modoEntrega)) {
      throw new Error("Modo de entrega inválido.");
    }

    if (modoEntrega === 'entrega em casa' && !horarioEntrega) {
     // Se não foi fornecido horário, gera um horário de entrega entre 50 e 120 minutos a partir de agora
     const minutosAleatorios = Math.floor(Math.random() * (120 - 50 + 1)) + 50; // Intervalo de 50 a 120 minutos
     this.horarioEntrega = new Date(Date.now() + minutosAleatorios * 60000); // Adiciona os minutos aleatórios
    }

    if (modoEntrega === 'consumo no local' && !mesa) {
      throw new Error("Número da mesa é obrigatório para 'consumo no local'.");
    }

    // Atribuição dos valores
    this.cliente = cliente;
    this.itens = itens;
    this.pagamento = {
      forma: pagamento.forma,
      valorTotal: pagamento.valorTotal,
      valorPago: pagamento.valorPago || 0,
      cupomDesconto: pagamento.cupomDesconto || null,
      valorDesconto: pagamento.valorDesconto || 0,
    };
    this.modoEntrega = modoEntrega;
    this.mesa = mesa;
    this.horarioEntrega = horarioEntrega;
    this.status = status;
    this.rastreamento = rastreamento;
    this.dataPedido = dataPedido;
  }

// Método para formatar o pedido para impressão
formatarParaImpressao() {
  try {
    let texto = `Pedido #${this.dataPedido.toISOString()}\n`;
  texto += `Cliente: ${this.cliente.nome}\n`;
  texto += `Telefone: ${this.cliente.telefone}\n`;
  texto += "Itens:\n";
  this.itens.forEach(item => {
    texto += `${item.Quantity} x ${item.name} (${item.category}) - R$ ${item.price.toFixed(2)}\n`;
  });
  texto += `Total: R$ ${this.pagamento.valorTotal.toFixed(2)}\n`;
  texto += `Forma de pagamento: ${this.pagamento.forma}\n`;

  // Detalhes de entrega
  if (this.modoEntrega === 'entrega em casa') {
    texto += `Horário estimado de entrega: ${this.horarioEntrega.toLocaleString()}\n`;
    texto += `Rastreamento: ${this.rastreamento.statusRastreamento} (${this.rastreamento.codigoRastreamento || 'N/A'})\n`;
  } else if (this.modoEntrega === 'consumo no local') {
    texto += `Mesa: ${this.mesa}\n`;
  }

  texto += `Data do pedido: ${this.dataPedido.toLocaleString()}\n`;
  texto += "Obrigado pela compra!";
  return texto;
  } catch (err) {
    console.error('Erro ao formate pedido: ' + err.message )
    throw new Error('Erro ao formate pedido: ' + err.message);
  }
  
}

}

module.exports = Pedido;
