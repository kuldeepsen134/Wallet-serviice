import { Request, Response, NextFunction } from "express";
import { asyncHandler, handleError } from "../utils/helper";
import jwt from 'jsonwebtoken'
import { env } from '../config/env';
import { apiMessages } from "../utils/apiMessage";



export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token)

        return handleError(res, 401, apiMessages?.UNAUTHORIZED)

    try {
        const decoded = jwt.verify(token, env?.JWT_SECRET);
        (req as any).user = decoded

        next()

    } catch {
        return handleError(res, 401, apiMessages?.INVALID_TOKEN)

    }
})