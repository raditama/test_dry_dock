import type { GetListParams } from '@/types/pagination'
import api from './client'
import type { SpecificationGroupLovResponse, SpecificationGroupResponse } from '@/types/specification-group'

export const getSpecificationGroups = async (
    params: GetListParams = {},
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

export const getSpecificationGroupLov = async (): Promise<SpecificationGroupLovResponse> => {
    const response = await api.get<SpecificationGroupLovResponse>('/specification-group/options')

    return response.data
}