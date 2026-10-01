import type { Pagination } from "./pagination"

export interface SpecificationGroup {
    id: number;
    group_no: string;
    name: string;
    sort_order: number;
}

export interface SpecificationGroupResponse {
    success: boolean
    message: string
    data: SpecificationGroup[]
    pagination: Pagination
}

export interface SpecificationGroupFormData {
    group_no: string;
    name: string;
    sort_order: number;
}