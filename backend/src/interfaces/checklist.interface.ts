import { Pagination } from "../dtos/pagination.dto";

export interface Checklist {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
}

export interface PaginatedChecklists {
    data: Checklist[];
    pagination: Pagination;
}
