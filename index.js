require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./interfaces/http/routes/product-routes");
const pedidoRoutes = require("./interfaces/http/routes/pedido-routes");
const connectToDatabase = require("./infra/database/mongodb/mongodb-connection");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use("/products", productRoutes);
app.use("/pedidos", pedidoRoutes);
// Porta do servidor
const PORT = 5000;
connectToDatabase();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
