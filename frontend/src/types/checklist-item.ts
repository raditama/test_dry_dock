import type { Pagination } from "./pagination"

export interface ChecklistItem {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
}

export interface ChecklistItemResponse {
    success: boolean
    message: string
    data: ChecklistItem[]
    pagination: Pagination
}

export interface ChecklistItemFormData {
    name: string;
    description: string | null;
    is_active: boolean;
}