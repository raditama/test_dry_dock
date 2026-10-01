import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { SpecificationGroup } from '../interfaces/specification-group.interface';
import dbPool from '../config/database';
import { PaginationQuery } from '../dtos/pagination.dto';
import { SpecificationGroupPayload } from '../dtos/specification-group.dto';
import { Lov } from '../interfaces/lov.interface';

interface SpecificationGroupRow extends RowDataPacket, SpecificationGroup { }
interface SpecificationGroupLovRow extends RowDataPacket, Lov {}

export class SpecificationGroupRepository {
    async findAll(
        query: PaginationQuery
    ): Promise<{ data: SpecificationGroup[]; total: number }> {
        const { page, limit, search } = query;

        const offset = (page - 1) * limit;
        const conditions: string[] = [];
        const params: any[] = [];

        if (search) {
            conditions.push(`
                    name LIKE ?
            `);

            const searchValue = `%${search}%`;

            params.push(searchValue);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(' AND ')}`
                : '';

        const [rows] = await dbPool.query<SpecificationGroupRow[]>(
            `
            SELECT
                id,
                group_no,
                name,
                sort_order
            FROM specification_group
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            `,
            [...params, limit, offset]
        );

        const [countRows] = await dbPool.query<RowDataPacket[]>(
            `
            SELECT COUNT(*) AS total
            FROM specification_group
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

    async findById(id: number): Promise<SpecificationGroup | null> {
        const [rows] = await dbPool.query<SpecificationGroupRow[]>(
            `
            SELECT
                id,
                group_no,
                name,
                sort_order
            FROM specification_group
            WHERE id = ?
            LIMIT 1
            `,
            [id]
        );

        return rows.length > 0 ? rows[0] : null;
    }

    async create(data: SpecificationGroupPayload): Promise<number> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            INSERT INTO specification_group (
                group_no,
                name,
                sort_order
            )
            VALUES (?, ?, ?)
            `,
            [
                data.group_no,
                data.name,
                data.sort_order,
            ]
        );

        return result.insertId;
    }

    async update(
        id: number,
        data: SpecificationGroupPayload
    ): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            UPDATE specification_group
            SET
                group_no = ?,
                name = ?,
                sort_order = ?
            WHERE id = ?
            `,
            [
                data.group_no,
                data.name,
                data.sort_order,
                id,
            ]
        );

        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            DELETE FROM specification_group
            WHERE id = ?
            `,
            [id]
        );

        return result.affectedRows > 0;
    }

    async findLov(): Promise<Lov[]> {
        const [rows] = await dbPool.query<SpecificationGroupLovRow[]>(
            `
            SELECT
                id,
                name
            FROM specification_group
            ORDER BY sort_order ASC
            `
        );

        return rows;
    }
}