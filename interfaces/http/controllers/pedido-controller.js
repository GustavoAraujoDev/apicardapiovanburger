const CriarPedidoUseCase = require("../../../application/use-cases/CriarPedidoUseCase");
const EncontrarPedidoPorIdUseCase = require('../../../application/use-cases/EncontrarPedidoPorIdUseCase');
const EncontrarPedidosPorTelefoneUseCase = require('../../../application/use-cases/EncontrarPedidosPorTelefoneUseCase');
const AtualizarStatusPedidoUseCase = require('../../../application/use-cases/AtualizarStatusPedidoUseCase');
const CancelarPedidoUseCase = require('../../../application/use-cases/CancelarPedidoUseCase');
const EncontrarTodosPedidosUseCase = require('../../../application/use-cases/EncontrarTodosPedidosUseCase');
const DeletePedidoUseCase = require('../../../application/use-cases/DeletePedidoUseCase');

class PedidoController {
  // Criar pedido
   async criarPedido(req, res) {
    try {
      const createpedido = new CriarPedidoUseCase();
      const pedidoData = req.body;
      const novoPedido = await createpedido.executar(pedidoData);
      res.status(201).json(novoPedido);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  // Encontrar pedido por ID
   async encontrarPedidoPorId(req, res) {
    try {
      const { id } = req.params;
      const buscarpedidoPorId = new EncontrarPedidoPorIdUseCase();
      const pedido = await buscarpedidoPorId.executar(id);
      res.status(200).json(pedido);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }
  // Encontrar pedido por ID
  async encontrarTodosPedido(req, res) {
    try {
      const buscarTodosPedido = new EncontrarTodosPedidosUseCase();
      const pedidos = await buscarTodosPedido.executar();
      res.status(200).json(pedidos);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  // Encontrar pedidos por telefone
   async encontrarPedidosPorTelefone(req, res) {
    try {
      const telefone  = req.params.telefone;
      const buscarpedidoPorTelefone = new EncontrarPedidosPorTelefoneUseCase();
      const pedidos = await buscarpedidoPorTelefone.executar(telefone);
      res.status(200).json(pedidos);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  // Atualizar status do pedido
   async atualizarStatus(req, res) {
    try {
      const { pedidoId } = req.params;
      const { status } = req.body;
      const atualizarPedido = new AtualizarStatusPedidoUseCase();
      const pedidoAtualizado = await atualizarPedido.executar(pedidoId, status);
      res.status(200).json(pedidoAtualizado);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  // Cancelar pedido
   async cancelarPedido(req, res) {
    try {
      const { pedidoId } = req.params;
      const cancelarpedido = new CancelarPedidoUseCase();
      const pedidoCancelado = await cancelarpedido.executar(pedidoId);
      res.status(200).json(pedidoCancelado);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

   // Cancelar pedido
   async cancelarPedido(req, res) {
    try {
      const { pedidoId } = req.params;
      const cancelarpedido = new CancelarPedidoUseCase();
      const pedidoCancelado = await cancelarpedido.executar(pedidoId);
      res.status(200).json(pedidoCancelado);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

// Cancelar pedido
async DeletarPedido(req, res) {
  try {
    const { pedidoId } = req.params;
    const deletarpedido = new DeletePedidoUseCase();
    const pedidodeletado = await deletarpedido.executar(pedidoId);
    res.status(200).json(pedidodeletado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}
}

module.exports = new PedidoController();
