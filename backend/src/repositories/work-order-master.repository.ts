import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { WorkOrderMaster, WorkOrderMasterGroup } from '../interfaces/work-order-master.interface';
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

    async findAllGroup(
        search?: string
    ): Promise<WorkOrderMasterGroup[]> {
        const conditions: string[] = [];
        const params: any[] = [];

        if (search) {
            conditions.push(`
            wom.job_code LIKE ?
        `);

            params.push(`%${search}%`);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(' AND ')}`
                : '';

        const [rows] = await dbPool.query<
            (WorkOrderMasterRow & {
                group_no: string;
                group_name: string;
                group_sort_order: number;
            })[]
        >(
            `
            SELECT
                wom.id,
                wom.specification_group_id,
                wom.job_code,
                wom.job_name,
                wom.job_category,
                wom.job_standar,
                wom.job_type,
                wom.job_critical,
                wom.job_internal,
                wom.estimated_hours,
                wom.job_desc,

                wmg.group_no,
                wmg.name AS group_name,
                wmg.sort_order AS group_sort_order

            FROM work_order_master wom

            INNER JOIN specification_group wmg
                ON wmg.id = wom.specification_group_id

            ${whereClause}

            ORDER BY
                wmg.sort_order ASC,
                wom.id DESC
            `,
            [...params]
        );

        const grouped = new Map<number, WorkOrderMasterGroup>();

        for (const row of rows) {
            if (!grouped.has(row.specification_group_id)) {
                grouped.set(row.specification_group_id, {
                    id: row.specification_group_id,
                    group_no: row.group_no,
                    name: row.group_name,
                    sort_order: row.group_sort_order,
                    data: [],
                });
            }

            grouped.get(row.specification_group_id)!.data.push({
                id: row.id,
                specification_group_id: row.specification_group_id,
                job_code: row.job_code,
                job_name: row.job_name,
                job_category: row.job_category,
                job_standar: row.job_standar,
                job_type: row.job_type,
                job_critical: row.job_critical,
                job_internal: row.job_internal,
                estimated_hours: row.estimated_hours,
                job_desc: row.job_desc,
            });
        }

        return Array.from(grouped.values());
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