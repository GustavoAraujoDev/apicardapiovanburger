/**
 * @file Server bootstrap
 * @description Arquivo principal responsável por inicializar a aplicação,
 * configurar middlewares, registrar rotas e iniciar o servidor HTTP.
 *
 * @requires dotenv
 * @requires express
 * @requires body-parser
 * @requires cors
 * @requires ./interfaces/http/routes/product-routes
 * @requires ./interfaces/http/routes/pedido-routes
 * @requires ./infra/database/mongodb/mongodb-connection
 */

require("dotenv").config();

const { swaggerUi, swaggerSpec } = require('./swagger');
const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleware = require("../apicardapiovanburger/interfaces/http/middlewares/cors.middleware")

const productRoutes = require("./interfaces/http/routes/product-routes");
const pedidoRoutes = require("./interfaces/http/routes/pedido-routes");
const connectToDatabase = require("./infra/database/mongodb/mongodb-connection");

/**
 * Instância principal da aplicação Express.
 * @type {import("express").Express}
 */
const app = express();

/**
 * =========================
 * Middlewares globais
 * =========================
 */

/**
 * Middleware responsável por interpretar requisições JSON.
 */
app.use(bodyParser.json());

/**
 * Middleware responsável por permitir requisições CORS.
 */
app.use(corsMiddleware());

/**
 * =========================
 * Registro de rotas
 * =========================
 */

/**
 * Rotas relacionadas a produtos.
 * @route /products
 */
app.use("/products", productRoutes);

/**
 * Rotas relacionadas a pedidos.
 * @route /pedidos
 */
app.use("/pedidos", pedidoRoutes);

/**
 * =========================
 * Inicialização do servidor
 * =========================
 */

/**
 * Porta em que o servidor será executado.
 * @type {number}
 */
const PORT = Number(process.env.PORT) || 5000;

/**
 * Inicializa a conexão com o banco de dados.
 */
connectToDatabase();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Inicia o servidor HTTP.
 */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
