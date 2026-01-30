const express = require("express");
const ProductController = require("../controllers/product-controller");
const validateRequest = require("../middlewares/validateRequest");
const ProductValidator = require("../../../application/validators/productValidator");
const AuthMiddleware = require("../auth/AuthMiddleware");
const { JwtService } = require("../auth/JwtService");

const router = express.Router();

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
 */
router.post("/auth/login", (req, res) =>
  ProductController.login(req, res)
);

/**
 * @swagger
 * /products/auth/registrar:
 *   post:
 *     summary: Registrar usuário
 *     tags: [Produtos]
 */
router.post("/auth/registrar", (req, res) =>
  ProductController.register(req, res)
);

/* =========================
   MIDDLEWARE DE AUTENTICAÇÃO
========================= */
router.use(AuthMiddleware(new JwtService()));

/* =========================
   ROTAS PROTEGIDAS
========================= */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Produtos]
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
 */
router.get("/", ProductController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Produtos]
 */
router.get("/:id", ProductController.findById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags: [Produtos]
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
 */
router.delete("/:id", ProductController.delete);

module.exports = router;
