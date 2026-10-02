import {
    ChecklistItemPayload,
    ChecklistItemQuery,
    ChecklistItemResponseDto,
    PaginatedChecklistItems,
} from "../dtos/checklist-item.dto";
import { ChecklistItem } from "../models/checklist-item.model";
import { IRepository } from "./repository.interface";

export interface IChecklistItemRepository extends IRepository<
    ChecklistItem,
    ChecklistItemPayload
> { }

export interface IChecklistItemService {
    getAllChecklistItems(
        query: ChecklistItemQuery,
    ): Promise<PaginatedChecklistItems>;

    getChecklistItemById(id: number): Promise<ChecklistItemResponseDto | null>;

    createChecklistItem(data: ChecklistItemPayload): Promise<number>;

    updateChecklistItem(id: number, data: ChecklistItemPayload): Promise<boolean>;

    deleteChecklistItem(id: number): Promise<boolean>;
}
