import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { WorkOrderMaster } from '../interfaces/work-order-master.interface';
import dbPool from '../config/database';
import { PaginationQuery } from '../dtos/pagination.dto';
import { WorkOrderMasterPayload } from '../dtos/work-order-master.dto';

interface WorkOrderMasterRow extends RowDataPacket, WorkOrderMaster { }

export class WorkOrderMasterRepository {
    async findAll(
        query: PaginationQuery
    ): Promise<{ data: WorkOrderMaster[]; total: number }> {
        const { page, limit, search } = query;

        const offset = (page - 1) * limit;
        const conditions: string[] = [];
        const params: any[] = [];

        if (search) {
            conditions.push(`
                    job_code LIKE ?
            `);

            const searchValue = `%${search}%`;

            params.push(searchValue);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(' AND ')}`
                : '';

        const [rows] = await dbPool.query<WorkOrderMasterRow[]>(
            `
            SELECT
                id,
                specification_group_id,
                job_code,
                job_name,
                job_category,
                job_standar,
                job_type,
                job_critical,
                job_internal,
                estimated_hours,
                job_desc
            FROM work_order_master
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            `,
            [...params, limit, offset]
        );

        const [countRows] = await dbPool.query<RowDataPacket[]>(
            `
            SELECT COUNT(*) AS total
            FROM work_order_master
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

    async findById(id: number): Promise<WorkOrderMaster | null> {
        const [rows] = await dbPool.query<WorkOrderMasterRow[]>(
            `
            SELECT
                id,
                specification_group_id,
                job_code,
                job_name,
                job_category,
                job_standar,
                job_type,
                job_critical,
                job_internal,
                estimated_hours,
                job_desc
            FROM work_order_master
            WHERE id = ?
            LIMIT 1
            `,
            [id]
        );

        return rows.length > 0 ? rows[0] : null;
    }

    async create(data: WorkOrderMasterPayload): Promise<number> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            INSERT INTO work_order_master (
                specification_group_id,
                job_code,
                job_name,
                job_category,
                job_standar,
                job_type,
                job_critical,
                job_internal,
                estimated_hours,
                job_desc
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                data.specification_group_id,
                data.job_code,
                data.job_name,
                data.job_category,
                data.job_standar,
                data.job_type,
                data.job_critical,
                data.job_internal,
                data.estimated_hours,
                data.job_desc
            ]
        );

        return result.insertId;
    }

    async update(
        id: number,
        data: WorkOrderMasterPayload
    ): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            UPDATE work_order_master
            SET
                specification_group_id = ?,
                job_code = ?,
                job_name = ?,
                job_category = ?,
                job_standar = ?,
                job_type = ?,
                job_critical = ?,
                job_internal = ?,
                estimated_hours = ?,
                job_desc = ?
            WHERE id = ?
            `,
            [
                data.specification_group_id,
                data.job_code,
                data.job_name,
                data.job_category,
                data.job_standar,
                data.job_type,
                data.job_critical,
                data.job_internal,
                data.estimated_hours,
                data.job_desc,
                id,
            ]
        );

        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await dbPool.query<ResultSetHeader>(
            `
            DELETE FROM work_order_master
            WHERE id = ?
            `,
            [id]
        );

        return result.affectedRows > 0;
    }
}