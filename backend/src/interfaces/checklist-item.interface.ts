import { Pagination } from "../dtos/pagination.dto";

export interface ChecklistItem {
    id: number;
    checklist_id: number;
    title: string;
}

export interface PaginatedChecklistItems {
    data: ChecklistItem[];
    pagination: Pagination;
}
