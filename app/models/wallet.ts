import mongoose, { Schema } from "mongoose"
import { IUserWallet } from "../interfaces/wallet"

const UserWalletSchema = new Schema<IUserWallet>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        balance: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

export const UserWalletModel = mongoose.model("UserWallet", UserWalletSchema)