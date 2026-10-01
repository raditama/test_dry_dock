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