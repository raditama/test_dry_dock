import api from './client'
import type { WorkOrderMasterResponse } from '@/types/work-order-master'

export interface GetWorkOrderMastersParams {
    page?: number
    limit?: number
    search?: string
}

export const getWorkOrderMasters = async (
    params: GetWorkOrderMastersParams = {},
): Promise<WorkOrderMasterResponse> => {
    const response = await api.get<WorkOrderMasterResponse>('/work-order-master', {
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search: params.search ?? '',
        },
    })

    return response.data
}

export const getWorkOrderMaster = async (id: number) => {
    const response = await api.get(`/work-order-master/${id}`)

    return response.data
}

export const createWorkOrderMaster = async (data: unknown) => {
    const response = await api.post('/work-order-master', data)

    return response.data
}

export const updateWorkOrderMaster = async (
    id: number,
    data: unknown,
) => {
    const response = await api.put(`/work-order-master/${id}`, data)

    return response.data
}

export const deleteWorkOrderMaster = async (id: number) => {
    const response = await api.delete(`/work-order-master/${id}`)

    return response.data
}