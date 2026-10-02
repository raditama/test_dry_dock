import { RowDataPacket } from "mysql2/promise";
import { IChecklistRepository } from "../interfaces/checklist.interface";
import { ChecklistPayload } from "../dtos/checklist.dto";
import { BaseRepository } from "../shared/base/base.repository";
import { Checklist } from "../models/checklist.model";

interface ChecklistRow extends RowDataPacket {
    id: number;
    name: string;
    description: string | null;
    is_active: number;
}

export class ChecklistRepository
    extends BaseRepository<Checklist, ChecklistRow, ChecklistPayload>
    implements IChecklistRepository {
    protected readonly tableName = "checklist";

    protected readonly columns = [
        "id",
        "name",
        "description",
        "is_active",
    ] as const;

    protected readonly searchableColumns = ["name"] as const;

    protected readonly orderBy = "id DESC";

    protected toEntity(row: ChecklistRow): Checklist {
        return new Checklist(
            row.id,
            row.name,
            row.description,
            Boolean(row.is_active),
        );
    }
}
