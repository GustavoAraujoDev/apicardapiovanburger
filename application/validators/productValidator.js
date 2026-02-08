const joi = require('joi');

const ProductValidator = {
  Create: joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    images: joi.array().items(joi.string()).required(),
    category: joi.string().required(),
    colors: joi.array().items(joi.string()).required(),
    tamanhos: joi.array().items(joi.string()).required(),
    stock: joi.number().required(),
    status: joi.string().required(),
    priceHistory: joi.array().default([])
  }),

  Update: joi.object({
    name: joi.string(),
    description: joi.string(),
    price: joi.number(),
    images: joi.array().items(joi.string()),
    category: joi.string(),
    colors: joi.array().items(joi.string()),
    tamanhos: joi.array().items(joi.string()),
    stock: joi.number(),
    status: joi.string(),
    priceHistory: joi.array()
  })
};

module.exports = ProductValidator;
