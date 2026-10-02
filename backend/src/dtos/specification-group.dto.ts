import { Pagination } from "./pagination.dto";

export interface SpecificationGroupPayload {
    group_no: string;
    name: string;
    sort_order: number;
}

export interface SpecificationGroupResponseDto {
    id: number;
    group_no: string;
    name: string;
    sort_order: number;
}

export interface PaginatedSpecificationGroups {
    data: SpecificationGroupResponseDto[];
    pagination: Pagination;
}

export interface SpecificationGroupOptionDto {
    id: number;
    name: string;
}