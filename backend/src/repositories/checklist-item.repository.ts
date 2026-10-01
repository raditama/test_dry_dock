import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ChecklistItem } from '../interfaces/checklist-item.interface';
import dbPool from '../config/database';
import { PaginationQuery } from '../dtos/pagination.dto';
import { ChecklistItemPayload } from '../dtos/checklist-item.dto';

interface ChecklistItemRow extends RowDataPacket, ChecklistItem { }

export class ChecklistItemRepository {
    async findAll(
        query: PaginationQuery,
        checklist_id?: number
    ): Promise<{ data: ChecklistItem[]; total: number }> {
        const { page, limit, search } = query;

        const offset = (page - 1) * limit;
        const conditions: string[] = [];
        const params: any[] = [];

        if (checklist_id != null) {
            conditions.push(`checklist_id = ?`);
            params.push(checklist_id);
        }

        if (search) {
            conditions.push(`
                    title LIKE ?
            `);

            const searchValue = `%${search}%`;
            params.push(searchValue);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(' AND ')}`
                : '';

        const [rows] = await dbPool.query<ChecklistItemRow[]>(
            `
            SELECT
                id,
                checklist_id,
                title
            FROM checklist_item
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            `,
            [...params, limit, offset]
        );

        const [countRows] = await dbPool.query<RowDataPacket[]>(
            `
            SELECT COUNT(*) AS total
            FROM checklist_item
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

    async findById(id: number): Promise<ChecklistItem | null> {
        const [rows] = await dbPool.query<ChecklistItemRow[]>(
            `
            SELECT
                id,
                checklist_id,
                title
            FROM checklist_item
            WHERE id = ?
            LIMIT 1
            `,
            [id]
        );

        return rows.length > 0 ? rows[0] : null;
    }

    async create(data: ChecklistItemPayload): Promise<number> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            INSERT INTO checklist_item (
                checklist_id,
                title
            )
            VALUES (?, ?)
            `,
            [
                data.checklist_id,
                data.title,
            ]
        );

        return result.insertId;
    }

    async update(
        id: number,
        data: ChecklistItemPayload
    ): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            UPDATE checklist_item
            SET
                checklist_id = ?,
                title = ?
            WHERE id = ?
            `,
            [
                data.checklist_id,
                data.title,
                id,
            ]
        );

        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            DELETE FROM checklist_item
            WHERE id = ?
            `,
            [id]
        );

        return result.affectedRows > 0;
    }
}