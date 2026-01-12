const swaggerJsdoc = require( 'swagger-jsdoc');
const swaggerUi = require( 'swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestao Pro',
      version: '1.0.0',
      description: 'Documentação automática via JSDoc'
    },
    servers: [
      { url: 'https://apicardapiovanburger.onrender.com', description: 'Local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
 apis: ['./interfaces/http/routes/**/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = {
  swaggerUi,
  swaggerSpec,
};
