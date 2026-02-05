const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product-controller");
const validateRequest = require("../middlewares/validateRequest");
const ProductValidator = require("../../../application/validators/productValidator");
const AuthMiddleware = require("../auth/AuthMiddleware");
const { JwtService } = require("../auth/JwtService");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gestão de produtos
 */

/* =========================
   ROTAS PÚBLICAS (AUTH)
========================= */

/**
 * @swagger
 * /products/auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/auth/login", (req, res) => ProductController.login(req, res));

/**
 * @swagger
 * /products/auth/registrar:
 *   post:
 *     summary: Registrar usuário
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - password
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/auth/registrar", (req, res) => ProductController.register(req, res));

/* =========================
   MIDDLEWARE DE AUTENTICAÇÃO
========================= */
router.use(AuthMiddleware(JwtService));

/* =========================
   ROTAS PROTEGIDAS
========================= */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post(
  "/",
  validateRequest(ProductValidator.create),
  ProductController.create
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get("/", ProductController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 */
router.get("/:id", ProductController.findById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
router.put(
  "/:id",
  validateRequest(ProductValidator.update),
  ProductController.update
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto deletado
 */
router.delete("/:id", ProductController.delete);

module.exports = router;
