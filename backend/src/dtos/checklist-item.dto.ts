import { Pagination, PaginationQuery } from "./pagination.dto";

export interface ChecklistItemPayload {
    checklist_id: number;
    title: string;
    data_type: string;
}
export interface ChecklistItemResponseDto {
    id: number;
    checklist_id: number;
    title: string;
    data_type: string;
}

export interface PaginatedChecklistItems {
    data: ChecklistItemResponseDto[];
    pagination: Pagination;
}

export interface ChecklistItemQuery extends PaginationQuery {
    checklist_id?: number;
}