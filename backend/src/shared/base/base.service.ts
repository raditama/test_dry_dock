import { Pagination, PaginationQuery } from '../../dtos/pagination.dto';

export abstract class BaseService {
    protected buildPagination(total: number, query: PaginationQuery): Pagination {
        return {
            page: query.page,
            limit: query.limit,
            total,
            totalPages: Math.ceil(total / query.limit),
        };
    }
}