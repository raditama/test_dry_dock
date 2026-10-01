import type { Pagination } from "./pagination"

export interface Checklist {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
}

export interface ChecklistResponse {
    success: boolean
    message: string
    data: Checklist[]
    pagination: Pagination
}

export interface ChecklistFormData {
    name: string;
    description: string | null;
    is_active: boolean;
}