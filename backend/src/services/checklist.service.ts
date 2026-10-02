import { PaginationQuery } from "../dtos/pagination.dto";
import {
    ChecklistPayload,
    ChecklistResponseDto,
    PaginatedChecklists,
} from "../dtos/checklist.dto";
import {
    IChecklistRepository,
    IChecklistService,
} from "../interfaces/checklist.interface";
import { Checklist } from "../models/checklist.model";
import { BaseService } from "../shared/base/base.service";

export class ChecklistService extends BaseService implements IChecklistService {
    constructor(private readonly checklistRepository: IChecklistRepository) {
        super();
    }

    async getAllChecklists(query: PaginationQuery): Promise<PaginatedChecklists> {
        const { data, total } = await this.checklistRepository.findAll(query);

        return {
            data: data.map((checklist) => this.toDto(checklist)),
            pagination: this.buildPagination(total, query),
        };
    }

    async getChecklistById(id: number): Promise<ChecklistResponseDto | null> {
        const checklist = await this.checklistRepository.findById(id);

        return checklist ? this.toDto(checklist) : null;
    }

    async createChecklist(data: ChecklistPayload): Promise<number> {
        return this.checklistRepository.create(data);
    }

    async updateChecklist(id: number, data: ChecklistPayload): Promise<boolean> {
        return this.checklistRepository.update(id, data);
    }

    async deleteChecklist(id: number): Promise<boolean> {
        return this.checklistRepository.delete(id);
    }

    private toDto(checklist: Checklist): ChecklistResponseDto {
        return {
            id: checklist.id,
            name: checklist.name,
            description: checklist.description,
            is_active: checklist.isActive,
        };
    }
}
