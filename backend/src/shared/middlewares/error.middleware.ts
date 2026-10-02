import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error';
import { sendError } from '../utils/response';

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    if (err instanceof AppError) {
        sendError(res, err.statusCode, err.code, err.message);
        return;
    }

    console.error(err);
    sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
};