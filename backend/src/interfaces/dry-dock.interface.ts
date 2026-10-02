import { Pagination, PaginationQuery } from '../dtos/pagination.dto';
import { DryDockPayload } from '../dtos/dry-dock.dto';
import {
    DryDock,
    DryDockPriority,
    DryDockStatus,
} from '../models/dry-dock.model';
import { IRepository } from './repository.interface';

export interface DryDockResponseDto {
    id: number;
    vessel: string;
    dock_list_no: string;
    description: string | null;
    shipyard_name: string | null;
    shipyard_detail: string | null;
    planned_start_date: string | null;
    planned_end_date: string | null;
    actual_start_date: string | null;
    actual_end_date: string | null;
    account_code: string | null;
    budget: number | null;
    responsible_bank: string | null;
    status: DryDockStatus;
    priority: DryDockPriority;
}

export interface PaginatedDryDocks {
    data: DryDockResponseDto[];
    pagination: Pagination;
}

export interface IDryDockRepository
    extends IRepository<DryDock, DryDockPayload> { }

export interface IDryDockService {
    getAllDryDocks(
        query: PaginationQuery,
    ): Promise<PaginatedDryDocks>;

    getDryDockById(
        id: number,
    ): Promise<DryDockResponseDto | null>;

    createDryDock(
        data: DryDockPayload,
    ): Promise<number>;

    updateDryDock(
        id: number,
        data: DryDockPayload,
    ): Promise<boolean>;

    deleteDryDock(
        id: number,
    ): Promise<boolean>;
}