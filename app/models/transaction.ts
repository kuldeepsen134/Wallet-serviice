import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  walletId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  referenceId: string;
  type: "CREDIT" | "DEBIT";
  status: "SUCCESS" | "FAILED";
  balanceBefore: number;
  balanceAfter: number;
  createdAt: Date;
  updatedAt: Date;
}

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