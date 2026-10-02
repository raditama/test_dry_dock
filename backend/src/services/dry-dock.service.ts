import { PaginationQuery } from "../dtos/pagination.dto";
import {
    DryDockPayload,
    DryDockResponseDto,
    PaginatedDryDocks,
} from "../dtos/dry-dock.dto";
import {
    IDryDockRepository,
    IDryDockService,
} from "../interfaces/dry-dock.interface";
import { DryDock } from "../models/dry-dock.model";
import { BaseService } from "../shared/base/base.service";

export class DryDockService extends BaseService implements IDryDockService {
    constructor(private readonly dryDockRepository: IDryDockRepository) {
        super();
    }

    async getAllDryDocks(query: PaginationQuery): Promise<PaginatedDryDocks> {
        const { data, total } = await this.dryDockRepository.findAll(query);

        return {
            data: data.map((dryDock) => this.toDto(dryDock)),
            pagination: this.buildPagination(total, query),
        };
    }

    async getDryDockById(id: number): Promise<DryDockResponseDto | null> {
        const dryDock = await this.dryDockRepository.findById(id);

        return dryDock ? this.toDto(dryDock) : null;
    }

    async createDryDock(data: DryDockPayload): Promise<number> {
        return this.dryDockRepository.create(data);
    }

    async updateDryDock(id: number, data: DryDockPayload): Promise<boolean> {
        return this.dryDockRepository.update(id, data);
    }

    async deleteDryDock(id: number): Promise<boolean> {
        return this.dryDockRepository.delete(id);
    }

    private formatDate(date: Date | null): string | null {
        if (!date) {
            return null;
        }

        return date.toISOString().split("T")[0];
    }

    private toDto(dryDock: DryDock): DryDockResponseDto {
        return {
            id: dryDock.id,
            vessel: dryDock.vessel,
            dock_list_no: dryDock.dockListNo,
            description: dryDock.description,
            shipyard_name: dryDock.shipyardName,
            shipyard_detail: dryDock.shipyardDetail,
            planned_start_date: this.formatDate(dryDock.plannedStartDate),
            planned_end_date: this.formatDate(dryDock.plannedEndDate),
            actual_start_date: this.formatDate(dryDock.actualStartDate),
            actual_end_date: this.formatDate(dryDock.actualEndDate),
            account_code: dryDock.accountCode,
            budget: dryDock.budget,
            responsible_bank: dryDock.responsibleBank,
            status: dryDock.status,
            priority: dryDock.priority,
        };
    }
}
