const express = require('express');
const PedidoController = require('../controllers/pedido-controller');

const router = express.Router();

// Rotas para pedidos
router.post('/', PedidoController.criarPedido);
router.post('/imprimir', PedidoController.imprimirPedidoController);
router.get('/:id', PedidoController.encontrarPedidoPorId);
router.get('/telefone/:telefone', PedidoController.encontrarPedidosPorTelefone);
router.get('/', PedidoController.encontrarTodosPedido);
router.put('/:pedidoId/status', PedidoController.atualizarStatus);
router.put('/:pedidoId/cancelar', PedidoController.cancelarPedido);
router.delete('/:pedidoId', PedidoController.DeletarPedido);

module.exports = router;
