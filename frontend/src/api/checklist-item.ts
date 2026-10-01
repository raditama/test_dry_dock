import api from './client'
import type { ChecklistItemResponse } from '@/types/checklist-item'

export interface GetChecklistItemsParams {
    page?: number
    limit?: number
    search?: string
}

export const getChecklistItems = async (
    params: GetChecklistItemsParams = {},
): Promise<ChecklistItemResponse> => {
    const response = await api.get<ChecklistItemResponse>('/checklist-item', {
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search: params.search ?? '',
        },
    })

    return response.data
}

export const getChecklistItem = async (id: number) => {
    const response = await api.get(`/checklist-item/${id}`)

    return response.data
}

export const createChecklistItem = async (data: unknown) => {
    const response = await api.post('/checklist-item', data)

    return response.data
}

export const updateChecklistItem = async (
    id: number,
    data: unknown,
) => {
    const response = await api.put(`/checklist-item/${id}`, data)

    return response.data
}

export const deleteChecklistItem = async (id: number) => {
    const response = await api.delete(`/checklist-item/${id}`)

    return response.data
}