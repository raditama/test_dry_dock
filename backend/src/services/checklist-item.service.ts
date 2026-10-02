import { PaginationQuery } from "../dtos/pagination.dto";
import {
    ChecklistItemPayload,
    ChecklistItemResponseDto,
    PaginatedChecklistItems,
} from "../dtos/checklist-item.dto";
import {
    IChecklistItemRepository,
    IChecklistItemService,
} from "../interfaces/checklist-item.interface";
import { ChecklistItem } from "../models/checklist-item.model";
import { BaseService } from "../shared/base/base.service";

export class ChecklistItemService
    extends BaseService
    implements IChecklistItemService {
    constructor(
        private readonly checklistItemRepository: IChecklistItemRepository,
    ) {
        super();
    }

    async getAllChecklistItems(
        query: PaginationQuery,
    ): Promise<PaginatedChecklistItems> {
        const { data, total } = await this.checklistItemRepository.findAll(query);

        return {
            data: data.map((checklistItem) => this.toDto(checklistItem)),
            pagination: this.buildPagination(total, query),
        };
    }

    async getChecklistItemById(
        id: number,
    ): Promise<ChecklistItemResponseDto | null> {
        const checklistItem = await this.checklistItemRepository.findById(id);

        return checklistItem ? this.toDto(checklistItem) : null;
    }

    async createChecklistItem(data: ChecklistItemPayload): Promise<number> {
        return this.checklistItemRepository.create(data);
    }

    async updateChecklistItem(
        id: number,
        data: ChecklistItemPayload,
    ): Promise<boolean> {
        return this.checklistItemRepository.update(id, data);
    }

    async deleteChecklistItem(id: number): Promise<boolean> {
        return this.checklistItemRepository.delete(id);
    }

    private toDto(checklistItem: ChecklistItem): ChecklistItemResponseDto {
        return {
            id: checklistItem.id,
            checklist_id: checklistItem.checklistId,
            title: checklistItem.title,
        };
    }
}
