import { DryDockPriority, DryDockStatus } from "../models/dry-dock.model";
import { Pagination } from "./pagination.dto";

export interface DryDockPayload {
    vessel: string;
    dock_list_no: string;
    description?: string;
    shipyard_name?: string;
    shipyard_detail?: string;
    planned_start_date?: Date;
    planned_end_date?: Date;
    actual_start_date?: Date;
    actual_end_date?: Date;
    account_code?: string;
    budget?: number;
    responsible_bank?: string;
    status?: DryDockStatus;
    priority?: DryDockPriority;
}

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