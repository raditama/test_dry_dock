import { PaginationQuery } from "../dtos/pagination.dto";
import { DryDockPayload } from "../dtos/dry-dock.dto";
import { DryDock, PaginatedDryDocks } from "../interfaces/dry-dock.interface";
import { DryDockRepository } from "../repositories/dry-dock.repository";
import { AppError } from "../shared/errors/app.error";

export class DryDockService {
    constructor(private dryDockRepository: DryDockRepository) { }

    async getAllDryDocks(query: PaginationQuery): Promise<PaginatedDryDocks> {
        const result = await this.dryDockRepository.findAll(query);

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

    async getDryDockById(id: number): Promise<DryDock> {
        const data = await this.dryDockRepository.findById(id);

        if (!data) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        return data;
    }

    async createDryDock(data: DryDockPayload): Promise<void> {
        await this.dryDockRepository.create(data);
    }

    async updateDryDock(id: number, data: DryDockPayload): Promise<void> {
        const existingData = await this.dryDockRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        await this.dryDockRepository.update(id, data);
    }

    async deleteDryDock(id: number): Promise<void> {
        const existingData = await this.dryDockRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        try {
            const deleted = await this.dryDockRepository.delete(id);

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
