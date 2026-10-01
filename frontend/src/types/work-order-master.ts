import type { Pagination } from "./pagination"

export interface WorkOrderMaster {
    id: number;
    specification_group_id: number;
    job_code: string;
    job_name: string;
    job_category: string | null;
    job_standar: string | null;
    job_type: string | null;
    job_critical: string | null;
    job_internal: string | null;
    estimated_hours: number | null;
    job_desc: string | null;
}

export interface WorkOrderMasterResponse {
    success: boolean
    message: string
    data: WorkOrderMaster[]
    pagination: Pagination
}

export interface WorkOrderMasterFormData {
    specification_group_id: number;
    job_code: string;
    job_name: string;
    job_category: string | null;
    job_standar: string | null;
    job_type: string | null;
    job_critical: string | null;
    job_internal: string | null;
    estimated_hours: number | null;
    job_desc: string | null;
}