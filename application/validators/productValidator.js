const joi = require('joi');

const ProductValidator = {
    Create: joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        category: joi.string().required(),
        images: joi.array().items(joi.string()),
        stock: joi.number().required(),
        status: joi.string().required(),
        priceHistory: joi.array()
    }),

    update: joi.object({
        name: joi.string(),
        description: joi.string(),
        price: joi.number(),
        category: joi.string(),
        images: joi.array().items(joi.string()),
        stock: joi.number(),
        status: joi.string(),
        priceHistory: joi.array()
    })
};

module.exports = ProductValidator;