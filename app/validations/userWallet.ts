import Joi from "joi"

export const createWalletSchema = Joi.object({
    amount: Joi.number().required(),
    referenceId: Joi.string().required()
})