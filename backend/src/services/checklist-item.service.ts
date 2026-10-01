import { PaginationQuery } from "../dtos/pagination.dto";
import { ChecklistItemPayload } from "../dtos/checklist-item.dto";
import { ChecklistItem, PaginatedChecklistItems } from "../interfaces/checklist-item.interface";
import { ChecklistItemRepository } from "../repositories/checklist-item.repository";
import { AppError } from "../shared/errors/app.error";

export class ChecklistItemService {
    constructor(private checklistItemRepository: ChecklistItemRepository) { }

    async getAllChecklistItems(query: PaginationQuery): Promise<PaginatedChecklistItems> {
        const result = await this.checklistItemRepository.findAll(query);

        const totalPages = Math.ceil(result.total / query.limit);

        return {
            data: result.data,
            pagination: {
                page: query.page,
                limit: query.limit,
                total: result.total,
                totalPages,
            },
        };
    }

    async getChecklistItemById(id: number): Promise<ChecklistItem> {
        const data = await this.checklistItemRepository.findById(id);

        if (!data) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        return data;
    }

    async createChecklistItem(data: ChecklistItemPayload): Promise<void> {
        await this.checklistItemRepository.create(data);
    }

    async updateChecklistItem(id: number, data: ChecklistItemPayload): Promise<void> {
        const existingData = await this.checklistItemRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        await this.checklistItemRepository.update(id, data);
    }

    async deleteChecklistItem(id: number): Promise<void> {
        const existingData = await this.checklistItemRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        try {
            const deleted = await this.checklistItemRepository.delete(id);

            if (!deleted) {
                throw new AppError(500, "DELETE_FAILED", "Failed to delete data");
            }
        } catch (error: any) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error?.code === "ER_ROW_IS_REFERENCED_2" || error?.errno === 1451) {
                throw new AppError(
                    409,
                    "DATA_IN_USE",
                    "Data cannot be deleted because it is still used by other data",
                );
            }

            throw new AppError(500, "DELETE_FAILED", "Failed to delete data");
        }
    }
}
