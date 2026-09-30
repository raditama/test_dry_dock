import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DryDock } from '../interfaces/dry-dock.interface';
import dbPool from '../config/database';
import { PaginationQuery } from '../dtos/pagination.dto';
import { DryDockPayload } from '../dtos/dry-dock.dto';

interface DryDockRow extends RowDataPacket, DryDock { }

export class DryDockRepository {
    async findAll(
        query: PaginationQuery
    ): Promise<{ data: DryDock[]; total: number }> {
        const { page, limit, search } = query;

        const offset = (page - 1) * limit;
        const conditions: string[] = [];
        const params: any[] = [];

        if (search) {
            conditions.push(`
                (
                    vessel LIKE ?
                    OR dock_list_no LIKE ?
                )
            `);

            const searchValue = `%${search}%`;

            params.push(searchValue, searchValue);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(' AND ')}`
                : '';

        const [rows] = await dbPool.query<DryDockRow[]>(
            `
            SELECT
                id,
                vessel,
                dock_list_no,
                description,
                shipyard_name,
                shipyard_detail,
                planned_start_date,
                planned_end_date,
                actual_start_date,
                actual_end_date,
                account_code,
                budget,
                responsible_bank,
                status,
                priority
            FROM dry_dock
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            `,
            [...params, limit, offset]
        );

        const [countRows] = await dbPool.query<RowDataPacket[]>(
            `
            SELECT COUNT(*) AS total
            FROM dry_dock
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

    async findById(id: number): Promise<DryDock | null> {
        const [rows] = await dbPool.query<DryDockRow[]>(
            `
            SELECT
                id,
                vessel,
                dock_list_no,
                description,
                shipyard_name,
                shipyard_detail,
                planned_start_date,
                planned_end_date,
                actual_start_date,
                actual_end_date,
                account_code,
                budget,
                responsible_bank,
                status,
                priority
            FROM dry_dock
            WHERE id = ?
            LIMIT 1
            `,
            [id]
        );

        return rows.length > 0 ? rows[0] : null;
    }

    async create(data: DryDockPayload): Promise<number> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            INSERT INTO dry_dock (
                vessel,
                dock_list_no,
                description,
                shipyard_name,
                shipyard_detail,
                planned_start_date,
                planned_end_date,
                actual_start_date,
                actual_end_date,
                account_code,
                budget,
                responsible_bank,
                status,
                priority
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                data.vessel,
                data.dock_list_no,
                data.description,
                data.shipyard_name,
                data.shipyard_detail,
                data.planned_start_date,
                data.planned_end_date,
                data.actual_start_date,
                data.actual_end_date,
                data.account_code,
                data.budget,
                data.responsible_bank,
                data.status,
                data.priority,
            ]
        );

        return result.insertId;
    }

    async update(
        id: number,
        data: DryDockPayload
    ): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            UPDATE dry_dock
            SET
                vessel = ?,
                dock_list_no = ?,
                description = ?,
                shipyard_name = ?,
                shipyard_detail = ?,
                planned_start_date = ?,
                planned_end_date = ?,
                actual_start_date = ?,
                actual_end_date = ?,
                account_code = ?,
                budget = ?,
                responsible_bank = ?,
                status = ?,
                priority = ?
            WHERE id = ?
            `,
            [
                data.vessel,
                data.dock_list_no,
                data.description,
                data.shipyard_name,
                data.shipyard_detail,
                data.planned_start_date,
                data.planned_end_date,
                data.actual_start_date,
                data.actual_end_date,
                data.account_code,
                data.budget,
                data.responsible_bank,
                data.status,
                data.priority,
                id,
            ]
        );

        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            DELETE FROM dry_dock
            WHERE id = ?
            `,
            [id]
        );

        return result.affectedRows > 0;
    }
}