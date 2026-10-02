import {
    WorkOrderMasterGroupedRow,
    WorkOrderMasterGroupResponseDto,
    WorkOrderMasterPayload,
    WorkOrderMasterResponseDto,
} from "../dtos/work-order-master.dto";
import { WorkOrderMaster } from "../models/work-order-master.model";
import { IRepository } from "./repository.interface";

export interface IWorkOrderMasterRepository extends IRepository<
    WorkOrderMaster,
    WorkOrderMasterPayload
> {
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

    createWorkOrderMaster(data: WorkOrderMasterPayload): Promise<number>;

    updateWorkOrderMaster(
        id: number,
        data: WorkOrderMasterPayload,
    ): Promise<boolean>;

    deleteWorkOrderMaster(id: number): Promise<boolean>;
}
