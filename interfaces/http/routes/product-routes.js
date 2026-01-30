const express = require("express");
const ProductController = require("../controllers/product-controller");
const validateRequest = require("../middlewares/validateRequest");
const ProductValidator = require("../../../application/validators/productValidator");

const router = express.Router();

<<<<<<< HEAD
/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gestão de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: X-Burger
 *               preco:
 *                 type: number
 *                 example: 19.9
 *               categoria:
 *                 type: string
 *                 example: Lanches
 *               ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", ProductController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
=======
router.post("/", validateRequest(ProductValidator.Create), ProductController.create);
>>>>>>> c46a330 ("versao 1.0")
router.get("/", ProductController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", ProductController.findById);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletar produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", ProductController.delete);
<<<<<<< HEAD
=======
router.update("/:id", validateRequest(ProductValidator.update), ProductController.update)
// Rota para update, delete e getById.
>>>>>>> c46a330 ("versao 1.0")

module.exports = router;
