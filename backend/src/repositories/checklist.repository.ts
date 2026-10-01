import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Checklist } from '../interfaces/checklist.interface';
import dbPool from '../config/database';
import { PaginationQuery } from '../dtos/pagination.dto';
import { ChecklistPayload } from '../dtos/checklist.dto';

interface ChecklistRow extends RowDataPacket, Checklist { }

export class ChecklistRepository {
    async findAll(
        query: PaginationQuery
    ): Promise<{ data: Checklist[]; total: number }> {
        const { page, limit, search } = query;

        const offset = (page - 1) * limit;
        const conditions: string[] = [];
        const params: any[] = [];

        if (search) {
            conditions.push(`
                (
                    name LIKE ?
                )
            `);

            const searchValue = `%${search}%`;

            params.push(searchValue, searchValue);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(' AND ')}`
                : '';

        const [rows] = await dbPool.query<ChecklistRow[]>(
            `
            SELECT
                id,
                name,
                description,
                is_active
            FROM checklist
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            `,
            [...params, limit, offset]
        );

        const [countRows] = await dbPool.query<RowDataPacket[]>(
            `
            SELECT COUNT(*) AS total
            FROM checklist
            ${whereClause}
            `,
            params
        );

        const total = Number(countRows[0].total);

        return {
            data: rows,
            total,
        };
    }

    async findById(id: number): Promise<Checklist | null> {
        const [rows] = await dbPool.query<ChecklistRow[]>(
            `
            SELECT
                id,
                name,
                description,
                is_active
            FROM checklist
            WHERE id = ?
            LIMIT 1
            `,
            [id]
        );

        return rows.length > 0 ? rows[0] : null;
    }

    async create(data: ChecklistPayload): Promise<number> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            INSERT INTO checklist (
                name,
                description,
                is_active
            )
            VALUES (?, ?, ?)
            `,
            [
                data.name,
                data.description,
                data.is_active,
            ]
        );

        return result.insertId;
    }

    async update(
        id: number,
        data: ChecklistPayload
    ): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            UPDATE checklist
            SET
                name = ?,
                description = ?,
                is_active = ?
            WHERE id = ?
            `,
            [
                data.name,
                data.description,
                data.is_active,
                id,
            ]
        );

        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            DELETE FROM checklist
            WHERE id = ?
            `,
            [id]
        );

        return result.affectedRows > 0;
    }
}