import type { Pagination } from "./pagination"

export interface ChecklistItem {
    id: number;
    checklist_id: number;
    title: string;
    data_type: string;
}

export interface ChecklistItemResponse {
    success: boolean
    message: string
    data: ChecklistItem[]
    pagination: Pagination
}

export interface ChecklistItemFormData {
    checklist_id: number;
    title: string;
    data_type: string;
}

export interface GetChecklistItemsParams {
    page?: number
    limit?: number
    search?: string
    checklist_id?: number
}