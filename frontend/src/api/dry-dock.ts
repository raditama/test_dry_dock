import type { GetListParams } from '@/types/pagination'
import api from './client'
import type { DryDockResponse } from '@/types/dry-dock'

export const getDryDocks = async (
    params: GetListParams = {},
): Promise<DryDockResponse> => {
    const response = await api.get<DryDockResponse>('/dry-dock', {
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search: params.search ?? '',
        },
    })

    return response.data
}

export const getDryDock = async (id: number) => {
    const response = await api.get(`/dry-dock/${id}`)

    return response.data
}

export const createDryDock = async (data: unknown) => {
    const response = await api.post('/dry-dock', data)

    return response.data
}

export const updateDryDock = async (
    id: number,
    data: unknown,
) => {
    const response = await api.put(`/dry-dock/${id}`, data)

    return response.data
}

export const deleteDryDock = async (id: number) => {
    const response = await api.delete(`/dry-dock/${id}`)

    return response.data
}