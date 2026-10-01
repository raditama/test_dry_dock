import type { Pagination } from "./pagination"

export type DryDockStatus = 'PLANNING' | 'EXECUTION' | 'COMPLETED'

export type DryDockPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface DryDock {
    id: number
    vessel: string
    dock_list_no: string
    description: string
    shipyard_name: string
    shipyard_detail: string
    planned_start_date: string
    planned_end_date: string
    actual_start_date: string | null
    actual_end_date: string | null
    account_code: string
    budget: string
    responsible_bank: string
    status: DryDockStatus
    priority: DryDockPriority
}

export interface DryDockResponse {
    success: boolean
    message: string
    data: DryDock[]
    pagination: Pagination
}

export interface DryDockFormData {
    vessel: string
    dock_list_no: string
    description: string
    shipyard_name: string
    shipyard_detail: string
    planned_start_date: string
    planned_end_date: string
    actual_start_date: string
    actual_end_date: string
    account_code: string
    budget: number | null
    responsible_bank: string
    status: DryDock['status']
    priority: DryDock['priority']
}