import mongoose, { Schema } from "mongoose"
import { IUser } from "../interfaces/user"

const UserSchema = new Schema<IUser>(
 {
  name: {
   type: String,
   required: true
  },

  email: {
   type: String,
   required: true,
   unique: true,
   index: true
  },

  password: {
   type: String,
   required: true
  },

//   role: {
//    type: String,
//    enum: ["admin", "user"],
//    default: "user"
//   }
 },
 { timestamps: true }
)

export const UserModel = mongoose.model<IUser>("User", UserSchema)