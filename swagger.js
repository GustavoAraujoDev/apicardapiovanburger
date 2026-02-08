const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Gestão Pro API',
      version: '1.0.0',
      description: `
API REST do sistema Gestão Pro.

Documentação gerada automaticamente via JSDoc.
      `,
      contact: {
        name: 'Equipe Gestão Pro',
        email: 'suporte@gestaopro.com'
      }
    },

    servers: [
      {
        url: 'https://apicardapiovanburger.onrender.com',
        description: 'Produção'
      },
      {
        url: 'http://localhost:5000',
        description: 'Desenvolvimento'
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {

        Product: {
  type: 'object',
  required: [
    'name',
    'description',
    'price',
    'images',
    'category',
    'colors',
    'tamanhos',
    'stock',
    'status'
  ],
  properties: {
    name: { type: 'string', example: 'Camiseta Premium' },
    description: { type: 'string', example: 'Camiseta de algodão 100%' },
    price: { type: 'number', example: 179.9 },
    images: {
      type: 'array',
      items: { type: 'string', example: 'https://site.com/img1.png' }
    },
    category: { type: 'string', example: 'Roupas' },
    colors: {
      type: 'array',
      items: { type: 'string', example: 'Preto' }
    },
    tamanhos: {
      type: 'array',
      items: { type: 'string', example: 'M' }
    },
    stock: { type: 'number', example: 50 },
    status: { type: 'string', example: 'ativo' },
    priceHistory: {
      type: 'array',
      items: { type: 'object' },
      example: []
    }
  }
},

        Pedido: {
          type: 'object',
          required: ['cliente', 'itens', 'pagamento', 'modoEntrega'],
          properties: {
            cliente: {
              type: 'object',
              required: ['nome', 'telefone'],
              properties: {
                nome: { type: 'string', example: 'João Silva' },
                telefone: { type: 'string', example: '85999999999' },
                endereco: { type: 'string', example: 'Rua A, 123' }
              }
            },

            itens: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['name', 'category', 'Quantity', 'price'],
                properties: {
                  name: { type: 'string', example: 'X-Burger' },
                  category: { type: 'string', example: 'Lanches' },
                  Quantity: { type: 'number', example: 2 },
                  price: { type: 'number', example: 18.9 },
                  description: { type: 'string', example: 'Hambúrguer artesanal' },
                  observacao: { type: 'string', example: 'Sem cebola' }
                }
              }
            },

            pagamento: {
              type: 'object',
              required: ['forma', 'valorTotal'],
              properties: {
                forma: { type: 'string', example: 'PIX' },
                valorTotal: { type: 'number', example: 45.5 },
                valorPago: { type: 'number', example: 50 },
                cupomDesconto: { type: 'string', nullable: true, example: 'PROMO10' },
                valorDesconto: { type: 'number', example: 5 }
              }
            },

            modoEntrega: {
              type: 'string',
              enum: ['entrega em casa', 'consumo no local']
            },

            mesa: { type: 'number', nullable: true, example: 12 },

            horarioEntrega: {
              type: 'string',
              format: 'date-time',
              example: '2026-01-12T21:30:00Z'
            },

            status: { type: 'string', example: 'em preparo' },

            rastreamento: {
              type: 'object',
              properties: {
                statusRastreamento: { type: 'string', example: 'aguardando' },
                codigoRastreamento: { type: 'string', nullable: true }
              }
            },

            dataPedido: {
              type: 'string',
              format: 'date-time'
            }
          }
        },

        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Erro ao processar requisição'
            }
          }
        }

      }
    }
  },

  apis: ['./interfaces/http/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};
