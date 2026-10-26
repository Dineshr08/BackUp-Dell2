import Joi from "joi";

const loginSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[^\\]+\\[^\\]+$/)
        .required()
        .messages({
            "string.pattern.base":
                "Username must be in format domain\\username (example: asia-pacific\\dinesh_r3)",
            "string.empty": "Username is required"
        }),

    password: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": "Password is required"
        })
});

const serviceSchema = Joi.object({
    serviceName: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": "Service name is required"
        })
});

export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }

    next();
};

export const validateServiceRequest = (req, res, next) => {
    const { error } = serviceSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }

    next();
};
