import { WorkOrderMasterPayload } from '../dtos/work-order-master.dto';
import { WorkOrderMaster } from '../models/work-order-master.model';
import { IRepository } from './repository.interface';

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

export interface IWorkOrderMasterRepository
    extends IRepository<WorkOrderMaster, WorkOrderMasterPayload> {
    findAllGroupedBySpecificationGroup(
        search?: string,
    ): Promise<WorkOrderMasterGroupedRow[]>;
}

export interface IWorkOrderMasterService {
    getAllWorkOrderMasters(
        search?: string,
    ): Promise<WorkOrderMasterGroupResponseDto[]>;

    getWorkOrderMasterById(
        id: number,
    ): Promise<WorkOrderMasterResponseDto | null>;

    createWorkOrderMaster(
        data: WorkOrderMasterPayload,
    ): Promise<number>;

    updateWorkOrderMaster(
        id: number,
        data: WorkOrderMasterPayload,
    ): Promise<boolean>;

    deleteWorkOrderMaster(
        id: number,
    ): Promise<boolean>;
}