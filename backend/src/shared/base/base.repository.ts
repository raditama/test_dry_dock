import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginationQuery } from "../../dtos/pagination.dto";
import {
    IRepository,
    PaginatedResult,
} from "../../interfaces/repository.interface";
import { BaseModel } from "./base.model";

export abstract class BaseRepository<
    TEntity extends BaseModel,
    TRow extends RowDataPacket,
    TPayload,
> implements IRepository<TEntity, TPayload> {
    protected abstract readonly tableName: string;
    protected abstract readonly columns: readonly string[];
    protected abstract readonly searchableColumns: readonly string[];
    protected abstract readonly orderBy: string;

    protected abstract toEntity(row: TRow): TEntity;

    constructor(protected readonly db: Pool) { }

    async findAll(
        query: PaginationQuery,
        filters?: Record<string, unknown>,
    ): Promise<PaginatedResult<TEntity>> {
        const { page, limit, search } = query;
        const offset = (page - 1) * limit;

        const { clause, params } = this.buildWhere(search, filters);

        const [rows] = await this.db.query<TRow[]>(
            `SELECT ${this.columns.join(", ")}
            FROM ${this.tableName}
            ${clause}
            ORDER BY ${this.orderBy}
            LIMIT ? OFFSET ?`,
            [...params, limit, offset],
        );

        const [countRows] = await this.db.query<RowDataPacket[]>(
            `SELECT COUNT(*) AS total
            FROM ${this.tableName}
            ${clause}`,
            params,
        );

        console.log(clause, params);

        return {
            data: rows.map((row) => this.toEntity(row)),
            total: Number(countRows[0].total),
        };
    }

    async findById(id: number): Promise<TEntity | null> {
        const [rows] = await this.db.query<TRow[]>(
            `SELECT ${this.columns.join(", ")}
            FROM ${this.tableName}
            WHERE id = ?
            LIMIT 1`,
            [id],
        );

        return rows.length > 0 ? this.toEntity(rows[0]) : null;
    }

    async create(data: TPayload): Promise<number> {
        const fields = Object.keys(data as object);

        const values = fields.map(
            (field) => (data as Record<string, unknown>)[field],
        );

        const placeholders = fields.map(() => "?").join(", ");

        const [result] = await this.db.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} (
                ${fields.join(", ")}
            )
            VALUES (${placeholders})`,
            values,
        );

        return result.insertId;
    }

    async update(id: number, data: TPayload): Promise<boolean> {
        const fields = Object.keys(data as object);

        const setClause = fields.map((field) => `${field} = ?`).join(", ");

        const values = fields.map(
            (field) => (data as Record<string, unknown>)[field],
        );

        const [result] = await this.db.query<ResultSetHeader>(
            `UPDATE ${this.tableName}
            SET ${setClause}
            WHERE id = ?`,
            [...values, id],
        );

        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName}
            WHERE id = ?`,
            [id],
        );

        return result.affectedRows > 0;
    }

    private buildWhere(
        search?: string,
        filters?: Record<string, unknown>,
    ): {
        clause: string;
        params: unknown[];
    } {
        const conditions: string[] = [];
        const params: unknown[] = [];

        if (search && this.searchableColumns.length > 0) {
            const searchConditions = this.searchableColumns.map(
                (column) => `${column} LIKE ?`,
            );

            conditions.push(`(${searchConditions.join(" OR ")})`);

            params.push(...this.searchableColumns.map(() => `%${search}%`));
        }

        if (filters) {
            for (const [column, value] of Object.entries(filters)) {
                if (value === undefined) continue;

                conditions.push(`${column} = ?`);
                params.push(value);
            }
        }

        return {
            clause: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
            params,
        };
    }
}
