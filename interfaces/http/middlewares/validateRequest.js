export const validateRequest = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
    return res.status(422).json({
        message: "Dados inválidos",
        errors: error.datails.map(d=> d.message)
    });
    }

    req.body = value;
    next();
} 