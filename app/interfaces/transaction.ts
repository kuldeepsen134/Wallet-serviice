import mongoose from "mongoose"
import { Document } from "mongoose"

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