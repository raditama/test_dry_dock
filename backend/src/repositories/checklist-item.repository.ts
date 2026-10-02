import { RowDataPacket } from "mysql2/promise";
import { IChecklistItemRepository } from "../interfaces/checklist-item.interface";
import { ChecklistItemPayload, ChecklistItemQuery } from "../dtos/checklist-item.dto";
import { BaseRepository } from "../shared/base/base.repository";
import { ChecklistItem } from "../models/checklist-item.model";
import { PaginatedResult } from "../interfaces/repository.interface";

interface ChecklistItemRow extends RowDataPacket {
    id: number;
    checklist_id: number;
    title: string;
    data_type: string;
}

export class ChecklistItemRepository
    extends BaseRepository<ChecklistItem, ChecklistItemRow, ChecklistItemPayload>
    implements IChecklistItemRepository {
    protected readonly tableName = "checklist_item";

    protected readonly columns = [
        "id",
        "checklist_id",
        "title",
        "data_type",
    ] as const;

    protected readonly searchableColumns = ["title"] as const;

    protected readonly orderBy = "id DESC";

    findAll(
        query: ChecklistItemQuery,
    ): Promise<PaginatedResult<ChecklistItem>> {
        return super.findAll(query, {
            checklist_id: query.checklist_id,
        });
    }

    protected toEntity(row: ChecklistItemRow): ChecklistItem {
        return new ChecklistItem(
            row.id,
            row.checklist_id,
            row.title,
            row.data_type,
        );
    }
}
