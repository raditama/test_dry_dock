import api from './client'
import type { GetWorkOrderMasterGroupParams, WorkOrderMasterGroupResponse } from '@/types/work-order-master'

export const getWorkOrderMasterGroup = async (
    params: GetWorkOrderMasterGroupParams = {},
): Promise<WorkOrderMasterGroupResponse> => {
    const response = await api.get<WorkOrderMasterGroupResponse>('/work-order-master', {
        params: {
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