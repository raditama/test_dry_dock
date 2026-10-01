import { PaginationQuery } from "../dtos/pagination.dto";
import { WorkOrderMasterPayload } from "../dtos/work-order-master.dto";
import { WorkOrderMaster, PaginatedWorkOrderMasters, WorkOrderMasterGroup } from "../interfaces/work-order-master.interface";
import { SpecificationGroupRepository } from "../repositories/specification-group.repository";
import { WorkOrderMasterRepository } from "../repositories/work-order-master.repository";
import { AppError } from "../shared/errors/app.error";

export class WorkOrderMasterService {
    constructor(
        private workOrderMasterRepository: WorkOrderMasterRepository,
        private specificationGroupRepository: SpecificationGroupRepository
    ) { }

    async getAllWorkOrderMasters(query: PaginationQuery): Promise<PaginatedWorkOrderMasters> {
        const result = await this.workOrderMasterRepository.findAll(query);

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

    async getAllWorkOrderMasterGroup(search?: string): Promise<WorkOrderMasterGroup[]> {
        const result = await this.workOrderMasterRepository.findAllGroup(search);

        return result;
    }

    async getWorkOrderMasterById(id: number): Promise<WorkOrderMaster> {
        const data = await this.workOrderMasterRepository.findById(id);

        if (!data) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        return data;
    }

    async createWorkOrderMaster(data: WorkOrderMasterPayload): Promise<void> {
        const specificationGroup = await this.specificationGroupRepository.findById(
            data.specification_group_id,
        );

        if (!specificationGroup) {
            throw new AppError(
                404,
                "RELATED_DATA_NOT_FOUND",
                "Related data not found",
            );
        }

        await this.workOrderMasterRepository.create(data);
    }

    async updateWorkOrderMaster(id: number, data: WorkOrderMasterPayload): Promise<void> {
        const existingData = await this.workOrderMasterRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        const specificationGroup = await this.specificationGroupRepository.findById(
            data.specification_group_id,
        );

        if (!specificationGroup) {
            throw new AppError(
                404,
                "RELATED_DATA_NOT_FOUND",
                "Related data not found",
            );
        }

        await this.workOrderMasterRepository.update(id, data);
    }

    async deleteWorkOrderMaster(id: number): Promise<void> {
        const existingData = await this.workOrderMasterRepository.findById(id);

        if (!existingData) {
            throw new AppError(404, "DATA_NOT_FOUND", "Data not found");
        }

        try {
            const deleted = await this.workOrderMasterRepository.delete(id);

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
