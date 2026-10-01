import { PaginationQuery } from "../dtos/pagination.dto";
import { ChecklistPayload } from "../dtos/checklist.dto";
import { Checklist, PaginatedChecklists } from "../interfaces/checklist.interface";
import { ChecklistRepository } from "../repositories/checklist.repository";
import { AppError } from "../shared/errors/app.error";

export class ChecklistService {
    constructor(private checklistRepository: ChecklistRepository) { }

    async getAllChecklists(query: PaginationQuery): Promise<PaginatedChecklists> {
        const result = await this.checklistRepository.findAll(query);

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

    async getChecklistById(id: number): Promise<Checklist> {
        const data = await this.checklistRepository.findById(id);

        if (!data) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        return data;
    }

    async createChecklist(data: ChecklistPayload): Promise<void> {
        await this.checklistRepository.create(data);
    }

    async updateChecklist(id: number, data: ChecklistPayload): Promise<void> {
        const existingData = await this.checklistRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        await this.checklistRepository.update(id, data);
    }

    async deleteChecklist(id: number): Promise<void> {
        const existingData = await this.checklistRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        try {
            const deleted = await this.checklistRepository.delete(id);

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
