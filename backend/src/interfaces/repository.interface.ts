import { PaginationQuery } from '../dtos/pagination.dto';

export interface PaginatedResult<T> {
    data: T[];
    total: number;
}

export interface IReadRepository<T> {
    findAll(query: PaginationQuery): Promise<PaginatedResult<T>>;
    findById(id: number): Promise<T | null>;
}

export interface IWriteRepository<T, TPayload> {
    create(data: TPayload): Promise<number>;
    update(id: number, data: TPayload): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}

export interface IRepository<T, TPayload>
    extends IReadRepository<T>,
    IWriteRepository<T, TPayload> { }