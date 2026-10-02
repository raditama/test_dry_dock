import { RowDataPacket } from "mysql2/promise";
import { IDryDockRepository } from "../interfaces/dry-dock.interface";
import { DryDockPayload } from "../dtos/dry-dock.dto";
import { BaseRepository } from "../shared/base/base.repository";
import {
    DryDock,
    DryDockPriority,
    DryDockStatus,
} from "../models/dry-dock.model";

interface DryDockRow extends RowDataPacket {
    id: number;
    vessel: string;
    dock_list_no: string;
    description: string | null;
    shipyard_name: string | null;
    shipyard_detail: string | null;
    planned_start_date: Date | null;
    planned_end_date: Date | null;
    actual_start_date: Date | null;
    actual_end_date: Date | null;
    account_code: string | null;
    budget: number | null;
    responsible_bank: string | null;
    status: DryDockStatus;
    priority: DryDockPriority;
}

export class DryDockRepository
    extends BaseRepository<DryDock, DryDockRow, DryDockPayload>
    implements IDryDockRepository {
    protected readonly tableName = "dry_dock";

    protected readonly columns = [
        "id",
        "vessel",
        "dock_list_no",
        "description",
        "shipyard_name",
        "shipyard_detail",
        "planned_start_date",
        "planned_end_date",
        "actual_start_date",
        "actual_end_date",
        "account_code",
        "budget",
        "responsible_bank",
        "status",
        "priority",
    ] as const;

    protected readonly searchableColumns = [
        "vessel",
        "dock_list_no",
        "shipyard_name",
    ] as const;

    protected readonly orderBy = "id DESC";

    protected toEntity(row: DryDockRow): DryDock {
        return new DryDock(
            row.id,
            row.vessel,
            row.dock_list_no,
            row.description,
            row.shipyard_name,
            row.shipyard_detail,
            row.planned_start_date,
            row.planned_end_date,
            row.actual_start_date,
            row.actual_end_date,
            row.account_code,
            row.budget,
            row.responsible_bank,
            row.status,
            row.priority,
        );
    }
}
