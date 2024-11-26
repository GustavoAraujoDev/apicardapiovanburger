const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: {
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: String, required: function() { return this.modoEntrega === 'entrega em casa'; } }, // Só é necessário para entrega em casa
    email: { type: String, required: false },
    observacoes: { type: String, required: false } // Observações gerais
  },
  itens: [{
    name: { type: String, required: true }, // Nome do item (pizza, bebida, sobremesa, etc.)
    category: { type: String, required: true }, // Categoria do item (ex: 'pizza', 'bebida', 'sobremesa', etc.)
    description: { type: String, required: false }, // Descrição detalhada (opcional)
    Quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // Preço por unidade
    extras: [{ type: String, required: false }] // Ingredientes ou complementos adicionais
  }],
  pagamento: {
    forma: { type: String, required: true, enum: ['dinheiro', 'cartão', 'PIX', 'transferência', 'vale-presente'] },
    valorTotal: { type: Number, required: true },
    valorPago: { type: Number, required: false }, // Pago no ato do pedido
    cupomDesconto: { type: String, required: false }, // Cupom de desconto aplicado
    valorDesconto: { type: Number, required: false, default: 0 }, // Desconto aplicado
  },
  status: { 
    type: String, 
    default: 'em preparo', 
    required: false,
    enum: ['em preparo', 'pronto para servir', 'cancelado', 'entregue', 'pendente']
  },
  modoEntrega: { 
    type: String, 
    enum: ['entrega em casa', 'consumo no local'], 
    required: true 
  },
  mesa: { type: Number, required: function() { return this.modoEntrega === 'consumo no local'; } }, // Número da mesa, apenas se for no local
  dataPedido: { type: Date, default: Date.now }, // Data em que o pedido foi feito
  rastreamento: { 
    statusRastreamento: { type: String, enum: ['aguardando', 'em preparo', 'pronto para servir'], default: 'aguardando' },
    codigoRastreamento: { type: String, required: false } // Código de rastreamento (se houver)
  },
  horarioEntrega: { type: Date, required: function() { return this.modoEntrega === 'entrega em casa'; } }, // Horário para entrega, se for o caso
});

const PedidoModel = mongoose.models.Pedido || mongoose.model('Pedido', pedidoSchema);


class PedidoRepository {
  // Criar um novo pedido
 async criarPedido(pedidoData) {
    try {
      console.log("rep Dados do pedido recebidos:", pedidoData);
      const pedidocheck = await PedidoModel.create(pedidoData);
      console.log("rep Dados do pedido salvo:", pedidocheck);
      return pedidocheck;
    } catch (err) {
      throw new Error('Erro ao criar pedido: ' + err.message);
    }
  }

  // Encontrar um pedido por ID
 async encontrarPorId(pedidoId) {
    try {
      const pedido = await PedidoModel.findById(pedidoId);
      if (!pedido) throw new Error('Pedido não encontrado');
      return pedido;
    } catch (err) {
      throw new Error('Erro ao encontrar pedido: ' + err.message);
    }
  }

  // Encontrar pedidos por telefone
   async encontrarPorTelefone(telefone) {
    try {
      const pedidos = await PedidoModel.find({ 'cliente.telefone': telefone });
      if (pedidos.length === 0) throw new Error('Nenhum pedido encontrado para esse telefone');
      return pedidos;
    } catch (err) {
      throw new Error('Erro ao encontrar pedidos pelo telefone: ' + err.message);
    }
  }

  // Atualizar o status de um pedido
  async atualizarStatus(pedidoId, novoStatus) {
    try {
      const pedido = await PedidoModel.findByIdAndUpdate(
        pedidoId,
        { status: novoStatus },
        { new: true }
      );

      if (!pedido) throw new Error('Pedido não encontrado ou não atualizado');
      return pedido;
    } catch (err) {
      throw new Error('Erro ao atualizar o status do pedido: ' + err.message);
    }
  }

  // Atualizar os dados de um pedido (exceto status)
  async atualizarPedido(pedidoId, novoDados) {
    try {
      const pedido = await PedidoModel.findByIdAndUpdate(
        pedidoId,
        novoDados,
        { new: true }
      );

      if (!pedido) throw new Error('Pedido não encontrado ou não atualizado');
      return pedido;
    } catch (err) {
      throw new Error('Erro ao atualizar pedido: ' + err.message);
    }
  }

  // Deletar um pedido
  async deletarPedido(pedidoId) {
    try {
      const pedido = await PedidoModel.findByIdAndDelete(pedidoId);
      if (!pedido) throw new Error('Pedido não encontrado');
      return pedido;
    } catch (err) {
      throw new Error('Erro ao deletar pedido: ' + err.message);
    }
  }

  // Encontrar todos os pedidos
   async encontrarTodos() {
    try {
      const pedidos = await PedidoModel.find();
      return pedidos;
    } catch (err) {
      throw new Error('Erro ao encontrar pedidos: ' + err.message);
    }
  }

  // Encontrar pedidos por status
   async encontrarPorStatus(status) {
    try {
      const pedidos = await PedidoModel.find({ status });
      return pedidos;
    } catch (err) {
      throw new Error('Erro ao encontrar pedidos: ' + err.message);
    }
  }

  // Cancelar um pedido (alterando o status para 'cancelado')
   async cancelarPedido(pedidoId) {
    try {
      const pedido = await PedidoModel.findByIdAndUpdate(
        pedidoId,
        { status: 'cancelado' },  // Alterando o status para 'cancelado'
        { new: true }  // Retornando o pedido atualizado
      );

      if (!pedido) throw new Error('Pedido não encontrado ou já foi cancelado');
      return pedido;
    } catch (err) {
      throw new Error('Erro ao cancelar pedido: ' + err.message);
    }
  }
}

module.exports = new PedidoRepository();
