const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product-controller");
const validateRequest = require("../middlewares/validateRequest");
const ProductValidator = require("../../../application/validators/productValidator");
const AuthMiddleware = require("../auth/AuthMiddleware");
const JwtService = require("../auth/JwtService");
const jwtService = new JwtService();
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
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/auth/registrar", (req, res) => ProductController.Registrer(req, res));

/* =========================
   MIDDLEWARE DE AUTENTICAÇÃO
========================= */
router.use(AuthMiddleware(jwtService));

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
  validateRequest(ProductValidator.Create),
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

/**
 * @swagger
 * /audit/logs:
 *   get:
 *     summary: Listar logs de auditoria (ADMIN)
 *     tags: [Auditoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: Página da listagem
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 20
 *         required: false
 *         description: Quantidade de registros por página
 *     responses:
 *       200:
 *         description: Logs retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       event:
 *                         type: string
 *                         example: ProductDeletedEvent
 *                       entity:
 *                         type: string
 *                         example: Product
 *                       entityId:
 *                         type: string
 *                         example: 65f2a8c9d91c2a0012ab3456
 *                       userId:
 *                         type: string
 *                         example: 65f2a8c9d91c2a0012ab9999
 *                       userEmail:
 *                         type: string
 *                         example: admin@email.com
 *                       status:
 *                         type: string
 *                         example: SUCCESS
 *                       ip:
 *                         type: string
 *                         example: 192.168.0.1
 *                       occurredAt:
 *                         type: string
 *                         example: 2026-02-20T14:30:00.000Z
 *                 total:
 *                   type: integer
 *                   example: 150
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 8
 *       403:
 *         description: Acesso negado (não é ADMIN)
 *       401:
 *         description: Token inválido ou não informado
 */
router.get("/audit/logs", (req, res) =>
  ProductController.listAudit(req, res)
);

module.exports = router;
