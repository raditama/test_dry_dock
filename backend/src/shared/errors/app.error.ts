export class AppError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number = 500,
        public readonly code: string = "INTERNAL_SERVER_ERROR",
    ) {
        super(message);

        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, code: string = "INVALID_PARAMETER") {
        super(message, 400, code);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string, code: string = "RESOURCE_NOT_FOUND") {
        super(message, 404, code);
    }
}