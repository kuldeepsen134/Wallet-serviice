import mongoose from "mongoose";
import { Request, Response } from "express";
import { asyncHandler, handleError, handleResponse } from "../../utils/helper";
import { UserWalletModel, TransactionModel } from "../../models";
import { apiMessages } from "../../utils/apiMessage";
import { creditWalletSchema } from "../../validations/transaction";

export const creditWallet = asyncHandler(async (req: Request, res: Response) => {

    const { userId } = req.params as { userId: string };

    const { error } = creditWalletSchema.validate(req.body);
    if (error) {
        return handleError(res, 400, error);
    }

    const { amount, referenceId } = req.body;

    if (!amount || amount <= 0) {
        return handleError(res, 400, apiMessages.AMOUNT_MUST_BE_POSITIVE);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        // check idempotency
        const existingTransaction = await TransactionModel.findOne({ referenceId });

        if (existingTransaction) {
            await session.abortTransaction();
            return handleResponse(
                res,
                200,
                existingTransaction,
                apiMessages.TRANSACTION_ALREADY_EXISTS
            );
        }
        const id = new mongoose.Types.ObjectId(userId)

        const wallet = await UserWalletModel.findOne({ userId: id as any }).session(session);

        if (!wallet) {
            await session.abortTransaction();
            return handleError(res, 404, apiMessages.WALLET_NOT_FOUND);
        }

        const balanceBefore = wallet.balance;
        const balanceAfter = balanceBefore + amount;

        wallet.balance = balanceAfter;
        await wallet.save({ session });

        const transaction = await TransactionModel.create(
            [
                {
                    walletId: wallet._id,
                    userId,
                    amount,
                    referenceId,
                    type: "CREDIT",
                    status: "SUCCESS",
                    balanceBefore,
                    balanceAfter
                }
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return handleResponse(
            res,
            200,
            {
                wallet,
                transaction: transaction[0]
            },
            apiMessages.AMOUT_CREDITED
        );

    } catch (error) {

        await session.abortTransaction();
        session.endSession();

        return handleError(res, 500, error);
    }
});


