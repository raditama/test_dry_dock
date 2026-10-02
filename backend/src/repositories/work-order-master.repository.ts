import { RowDataPacket } from "mysql2/promise";
import { IWorkOrderMasterRepository } from "../interfaces/work-order-master.interface";
import { WorkOrderMasterPayload } from "../dtos/work-order-master.dto";
import { BaseRepository } from "../shared/base/base.repository";
import { WorkOrderMaster } from "../models/work-order-master.model";

interface WorkOrderMasterRow extends RowDataPacket {
    id: number;
    specification_group_id: number;
    job_code: string;
    job_name: string;
    job_category: string | null;
    job_standar: string | null;
    job_type: string | null;
    job_critical: string | null;
    job_internal: string | null;
    estimated_hours: number | null;
    job_desc: string | null;
}

export interface WorkOrderMasterGroupedRow extends RowDataPacket {
    specification_group_id: number;
    group_no: string;
    name: string;
    sort_order: number;

    work_order_id: number | null;
    job_code: string | null;
    job_name: string | null;
    job_category: string | null;
    job_standar: string | null;
    job_type: string | null;
    job_critical: string | null;
    job_internal: string | null;
    estimated_hours: number | null;
    job_desc: string | null;
}

export class WorkOrderMasterRepository
    extends BaseRepository<
        WorkOrderMaster,
        WorkOrderMasterRow,
        WorkOrderMasterPayload
    >
    implements IWorkOrderMasterRepository {
    protected readonly tableName = "work_order_master";

    protected readonly columns = [
        "id",
        "specification_group_id",
        "job_code",
        "job_name",
        "job_category",
        "job_standar",
        "job_type",
        "job_critical",
        "job_internal",
        "estimated_hours",
        "job_desc",
    ] as const;

    protected readonly searchableColumns = [
        "job_type",
        "job_code",
        "job_name",
    ] as const;

    protected readonly orderBy = "id DESC";

    protected toEntity(row: WorkOrderMasterRow): WorkOrderMaster {
        return new WorkOrderMaster(
            row.id,
            row.specification_group_id,
            row.job_code,
            row.job_name,
            row.job_category,
            row.job_standar,
            row.job_type,
            row.job_critical,
            row.job_internal,
            row.estimated_hours,
            row.job_desc,
        );
    }

    async findAllGroupedBySpecificationGroup(
        search?: string,
    ): Promise<WorkOrderMasterGroupedRow[]> {
        const searchPattern = search
            ? `%${search}%`
            : null;

        const query = `
            SELECT
                sg.id AS specification_group_id,
                sg.group_no,
                sg.name,
                sg.sort_order,
                wom.id AS work_order_id,
                wom.job_code,
                wom.job_name,
                wom.job_category,
                wom.job_standar,
                wom.job_type,
                wom.job_critical,
                wom.job_internal,
                wom.estimated_hours,
                wom.job_desc
            FROM specification_group sg
            LEFT JOIN work_order_master wom
                ON wom.specification_group_id = sg.id
            WHERE
                ? IS NULL
                OR wom.job_type LIKE ?
                OR wom.job_code LIKE ?
                OR wom.job_name LIKE ?
            ORDER BY
                sg.sort_order ASC,
                wom.id DESC
        `;

        const [rows] = await this.db.execute<WorkOrderMasterGroupedRow[]>(
            query,
            [
                searchPattern,
                searchPattern,
                searchPattern,
                searchPattern,
            ],
        );

        return rows;
    }
}
