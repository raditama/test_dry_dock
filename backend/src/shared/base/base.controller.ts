import { Request, RequestHandler, Response } from "express";
import { PaginationQuery } from "../../dtos/pagination.dto";
import { BadRequestError, NotFoundError } from "../errors/app.error";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export abstract class BaseController {
    protected handle(
        fn: (req: Request, res: Response) => Promise<unknown>,
    ): RequestHandler {
        return (req, res, next) => {
            fn(req, res).catch(next);
        };
    }

    protected parsePagination(req: Request): PaginationQuery {
        const page = this.parsePositiveInt(req.query.page, "Page", DEFAULT_PAGE);

        const limit = this.parsePositiveInt(
            req.query.limit,
            "Limit",
            DEFAULT_LIMIT,
        );

        if (limit > MAX_LIMIT) {
            throw new BadRequestError(`Limit must not exceed ${MAX_LIMIT}`);
        }

        const search =
            typeof req.query.search === "string"
                ? req.query.search.trim() || undefined
                : undefined;

        return {
            page,
            limit,
            search,
        };
    }

    protected parseId(req: Request, param = "id"): number {
        const value = Number(req.params[param]);

        if (!Number.isInteger(value) || value < 1) {
            throw new BadRequestError(`${param} must be a positive integer`);
        }

        return value;
    }

    protected throwNotFound(message = "Data not found"): never {
        throw new NotFoundError(message);
    }

    private parsePositiveInt(
        value: unknown,
        label: string,
        fallback: number,
    ): number {
        if (value === undefined) {
            return fallback;
        }

        const parsed = Number(value);

        if (!Number.isInteger(parsed) || parsed < 1) {
            throw new BadRequestError(`${label} must be a positive integer`);
        }

        return parsed;
    }
}
