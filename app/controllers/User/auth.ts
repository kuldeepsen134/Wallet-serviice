import { Request, Response } from "express";
import { asyncHandler, handleError, handleResponse } from "../../utils/helper";
import { loginSchema, registerSchema } from "../../validations/user";
import { UserModel } from "../../models";
import { apiMessages } from "../../utils/apiMessage";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from "../../config/env";


export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return handleError(res, 400, error);
        }

        const { name, email, password, } = req.body;

        const existing = await UserModel.findOne({ email });

        if (existing) {
            return handleError(res, 400, apiMessages?.USER_ALREADY_EXISTS);
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await UserModel.create({ name, email, password: hash });

        handleResponse(res, 201, user.toObject(), apiMessages?.USER_CREATED,);

    } catch (error: unknown) {

        if (error instanceof Error) {
            return handleError(res, 500, error.message);
        } else {
            return handleError(res, 500, error);
        }

    }
})



export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return handleError(res, 400, error);
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("-password -__v");

        if (!user) {
            return handleError(res, 400, apiMessages?.INVALID_CREDENTIALS);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return handleError(res, 400, apiMessages?.INVALID_CREDENTIALS);
        }

        const token = jwt.sign(
            { id: user._id },
            env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return handleResponse(res, 200, { token, ...userResponse }, apiMessages?.USER_UPDATED);

    } catch (error: unknown) {
        if (error instanceof Error) {
            return handleError(res, 500, error.message);
        } else {
            return handleError(res, 500, error);
        }
    }
})