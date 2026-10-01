import api from './client'
import type { SpecificationGroupResponse } from '@/types/specification-group'

export interface GetSpecificationGroupsParams {
    page?: number
    limit?: number
    search?: string
}

export const getSpecificationGroups = async (
    params: GetSpecificationGroupsParams = {},
): Promise<SpecificationGroupResponse> => {
    const response = await api.get<SpecificationGroupResponse>('/specification-group', {
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search: params.search ?? '',
        },
    })

    return response.data
}

export const getSpecificationGroup = async (id: number) => {
    const response = await api.get(`/specification-group/${id}`)

    return response.data
}

export const createSpecificationGroup = async (data: unknown) => {
    const response = await api.post('/specification-group', data)

    return response.data
}

export const updateSpecificationGroup = async (
    id: number,
    data: unknown,
) => {
    const response = await api.put(`/specification-group/${id}`, data)

    return response.data
}

export const deleteSpecificationGroup = async (id: number) => {
    const response = await api.delete(`/specification-group/${id}`)

    return response.data
}