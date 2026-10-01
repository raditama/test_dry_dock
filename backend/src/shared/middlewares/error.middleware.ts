import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error';
import { sendError } from '../utils/response';

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof AppError) {
        sendError(res, error.statusCode, error.code, error.message);
        return;
    }

    const message = error instanceof Error ? error.message : 'Unknown error';

    sendError(res, 500, 'INTERNAL_SERVER_ERROR', message);
};
