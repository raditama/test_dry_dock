import { Pagination } from "../dtos/pagination.dto";

export type DryDockStatus = "PLANNING" | "EXECUTION" | "COMPLETED";

export type DryDockPriority = "LOW" | "MEDIUM" | "HIGH";

export interface DryDock {
    id: number;
    vessel: string;
    dock_list_no: string;
    description: string | null;
    shipyard_name: string | null;
    shipyard_detail: string | null;
    planned_start_date: Date | null;
    planned_end_date: Date | null;
    actual_start_date: Date | null;
    actual_end_date: Date | null;
    account_code: string | null;
    budget: number | null;
    responsible_bank: string | null;
    status: DryDockStatus;
    priority: DryDockPriority;
}

export interface PaginatedDryDocks {
    data: DryDock[];
    pagination: Pagination;
}
