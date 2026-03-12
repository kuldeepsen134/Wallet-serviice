import Joi from "joi";

export const creditWalletSchema = Joi.object({
    amount: Joi.number().required(),
    userId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
})