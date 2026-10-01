import type { GetListParams } from '@/types/pagination'
import api from './client'
import type { ChecklistResponse } from '@/types/checklist'

export const getChecklists = async (
    params: GetListParams = {},
): Promise<ChecklistResponse> => {
    const response = await api.get<ChecklistResponse>('/checklist', {
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search: params.search ?? '',
        },
    })

    return response.data
}

export const getChecklist = async (id: number) => {
    const response = await api.get(`/checklist/${id}`)

    return response.data
}

export const createChecklist = async (data: unknown) => {
    const response = await api.post('/checklist', data)

    return response.data
}

export const updateChecklist = async (
    id: number,
    data: unknown,
) => {
    const response = await api.put(`/checklist/${id}`, data)

    return response.data
}

export const deleteChecklist = async (id: number) => {
    const response = await api.delete(`/checklist/${id}`)

    return response.data
}