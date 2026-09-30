import { Response } from 'express';
import { Pagination } from '../../dtos/pagination.dto';

export const sendSuccess = <T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200,
    pagination?: Pagination
): void => {
    res.status(statusCode).json({
        success: true,
        message,
        ...(data !== undefined && { data }),
        pagination,
    });
};

export const sendError = (res: Response, statusCode: number, code: string, message: string): void => {
    res.status(statusCode).json({
        success: false,
        code,
        message,
    });
};
