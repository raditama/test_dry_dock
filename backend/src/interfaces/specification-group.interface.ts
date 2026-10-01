import { Pagination } from "../dtos/pagination.dto";

export interface SpecificationGroup {
    id: number;
    group_no: string;
    name: string;
    sort_order: number;
}

export interface PaginatedSpecificationGroups {
    data: SpecificationGroup[];
    pagination: Pagination;
}
