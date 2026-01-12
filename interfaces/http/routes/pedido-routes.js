const express = require('express');
const PedidoController = require('../controllers/pedido-controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestão de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               telefone:
 *                 type: string
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', PedidoController.criarPedido);

/**
 * @swagger
 * /pedidos/imprimir:
 *   post:
 *     summary: Gerar impressão do pedido
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Pedido impresso com sucesso
 */
router.post('/imprimir', PedidoController.imprimirPedidoController);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', PedidoController.encontrarPedidoPorId);

/**
 * @swagger
 * /pedidos/telefone/{telefone}:
 *   get:
 *     summary: Buscar pedidos por telefone
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: telefone
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/telefone/:telefone', PedidoController.encontrarPedidosPorTelefone);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */
router.get('/', PedidoController.encontrarTodosPedido);

/**
 * @swagger
 * /pedidos/{pedidoId}/status:
 *   put:
 *     summary: Atualizar status do pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.put('/:pedidoId/status', PedidoController.atualizarStatus);

/**
 * @swagger
 * /pedidos/{pedidoId}/cancelar:
 *   put:
 *     summary: Cancelar pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso
 */
router.put('/:pedidoId/cancelar', PedidoController.cancelarPedido);

/**
 * @swagger
 * /pedidos/{pedidoId}:
 *   delete:
 *     summary: Deletar pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 */
router.delete('/:pedidoId', PedidoController.DeletarPedido);

module.exports = router;
