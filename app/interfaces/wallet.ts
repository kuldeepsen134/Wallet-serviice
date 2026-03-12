import mongoose from "mongoose"
import { Document } from "mongoose"

export interface IUserWallet extends Document {

    userId: mongoose.Schema.Types.ObjectId
    balance: number

    createdAt?: Date
    updatedAt?: Date
}