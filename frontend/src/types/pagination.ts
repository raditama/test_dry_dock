export interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

export interface GetListParams {
    page?: number
    limit?: number
    search?: string
}