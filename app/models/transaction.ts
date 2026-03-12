import mongoose, { Schema, Document } from "mongoose";
import { ITransaction } from "../interfaces/transaction";

const transactionSchema = new Schema<ITransaction>(
  {
    walletId: {
      type: Schema.Types.ObjectId,
      ref: "UserWallet",
      required: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    referenceId: {
      type: String,
      required: true,
      unique: true
    },

    type: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS"
    },
    balanceBefore: {
      type: Number,
      required: true
    },
    balanceAfter: {
      type: Number,
      required: true
    }
  },

  {
    timestamps: true
  }
);

transactionSchema.index({ userId: 1 });
transactionSchema.index({ walletId: 1 });
transactionSchema.index({ referenceId: 1 }, { unique: true });

export const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);