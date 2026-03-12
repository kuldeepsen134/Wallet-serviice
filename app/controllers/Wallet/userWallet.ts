import { Request, Response } from "express";
import { asyncHandler, handleError, handleResponse } from "../../utils/helper";

import { apiMessages } from "../../utils/apiMessage";
import { UserWalletModel } from "../../models";
import { createWalletSchema } from "../../validations/userWallet";


export const createUserWallet = asyncHandler(async (req: Request, res: Response) => {

    try {

        const { error } = createWalletSchema.validate(req.body);
        if (error) {
            return handleError(res, 400, error);
        }

        const { amount, userId } = req.body

        const existingWallet = await UserWalletModel.findOne({ userId: userId });

        if (existingWallet) {
            return handleError(res, 400, apiMessages?.USER_WALLET_ALREADY_EXISTS);
        }

        const userWallet = await UserWalletModel.create({ userId: userId });

        handleResponse(res, 201, userWallet.toObject(), apiMessages?.USER_CREATED,);

    } catch (error: unknown) {

        if (error instanceof Error) {
            return handleError(res, 500, error.message);
        } else {
            return handleError(res, 500, error);
        }

    }
}
)



