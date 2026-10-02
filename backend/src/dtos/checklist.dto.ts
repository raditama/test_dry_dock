import { Pagination } from "./pagination.dto";

export interface ChecklistPayload {
    name: string;
    description?: string;
    is_active: boolean;
}

export interface ChecklistResponseDto {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
}

export interface PaginatedChecklists {
    data: ChecklistResponseDto[];
    pagination: Pagination;
}