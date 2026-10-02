export interface WorkOrderMasterPayload {
    specification_group_id: number;
    job_code: string;
    job_name: string;
    job_category?: string;
    job_standar?: string;
    job_type?: string;
    job_critical?: string;
    job_internal?: string;
    estimated_hours?: number;
    job_desc?: string;
}

export interface WorkOrderMasterResponseDto {
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

export interface WorkOrderMasterGroupResponseDto {
    id: number;
    group_no: string;
    name: string;
    sort_order: number;
    data: WorkOrderMasterResponseDto[];
}

export interface WorkOrderMasterGroupedRow {
    specification_group_id: number;
    group_no: string;
    name: string;
    sort_order: number;
    work_order_id: number | null;
    job_code: string | null;
    job_name: string | null;
    job_category: string | null;
    job_standar: string | null;
    job_type: string | null;
    job_critical: string | null;
    job_internal: string | null;
    estimated_hours: number | null;
    job_desc: string | null;
}