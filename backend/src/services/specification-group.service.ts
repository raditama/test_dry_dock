import { PaginationQuery } from "../dtos/pagination.dto";
import { SpecificationGroupPayload } from "../dtos/specification-group.dto";
import { SpecificationGroup, PaginatedSpecificationGroups } from "../interfaces/specification-group.interface";
import { SpecificationGroupRepository } from "../repositories/specification-group.repository";
import { AppError } from "../shared/errors/app.error";

export class SpecificationGroupService {
    constructor(private specificationGroupRepository: SpecificationGroupRepository) { }

    async getAllSpecificationGroups(query: PaginationQuery): Promise<PaginatedSpecificationGroups> {
        const result = await this.specificationGroupRepository.findAll(query);

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

    async getSpecificationGroupById(id: number): Promise<SpecificationGroup> {
        const data = await this.specificationGroupRepository.findById(id);

        if (!data) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        return data;
    }

    async createSpecificationGroup(data: SpecificationGroupPayload): Promise<void> {
        await this.specificationGroupRepository.create(data);
    }

    async updateSpecificationGroup(id: number, data: SpecificationGroupPayload): Promise<void> {
        const existingData = await this.specificationGroupRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        await this.specificationGroupRepository.update(id, data);
    }

    async deleteSpecificationGroup(id: number): Promise<void> {
        const existingData = await this.specificationGroupRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        try {
            const deleted = await this.specificationGroupRepository.delete(id);

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
