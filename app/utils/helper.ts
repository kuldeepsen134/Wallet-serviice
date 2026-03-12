import { Request, Response, NextFunction, } from "express"

export const handleResponse = (res: Response, statusCode: number, data: any, message?: string) => {
    return res.status(statusCode).json({
        ...data,
        error: false,
        message: message || null
    })
}

export const handleError = (res: Response, statusCode: number, error: any) => {
    console.error(error);
    return res.status(statusCode).json({
        error: true,
        message:  error?.message?.details ? error?.message?.details[0]?.message : error.message ? error.message  : error || null
    })
}


export const asyncHandler = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}