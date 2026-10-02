import { WorkOrderMasterPayload } from "../dtos/work-order-master.dto";
import {
    IWorkOrderMasterRepository,
    IWorkOrderMasterService,
    WorkOrderMasterGroupResponseDto,
    WorkOrderMasterResponseDto,
} from "../interfaces/work-order-master.interface";
import { WorkOrderMaster } from "../models/work-order-master.model";
import { BaseService } from "../shared/base/base.service";

export class WorkOrderMasterService
    extends BaseService
    implements IWorkOrderMasterService {

    constructor(
        private readonly workOrderMasterRepository: IWorkOrderMasterRepository,
    ) {
        super();
    }

    async getAllWorkOrderMasters(
        search?: string,
    ): Promise<WorkOrderMasterGroupResponseDto[]> {
        const workOrderRows =
            await this.workOrderMasterRepository
                .findAllGroupedBySpecificationGroup(search);

        const specificationGroups = new Map<
            number,
            WorkOrderMasterGroupResponseDto
        >();

        for (const workOrderRow of workOrderRows) {
            if (!specificationGroups.has(workOrderRow.specification_group_id)) {
                specificationGroups.set(
                    workOrderRow.specification_group_id,
                    {
                        id: workOrderRow.specification_group_id,
                        group_no: workOrderRow.group_no,
                        name: workOrderRow.name,
                        sort_order: workOrderRow.sort_order,
                        data: [],
                    },
                );
            }

            if (workOrderRow.work_order_id !== null) {
                specificationGroups
                    .get(workOrderRow.specification_group_id)!
                    .data.push({
                        id: workOrderRow.work_order_id,
                        specification_group_id:
                            workOrderRow.specification_group_id,
                        job_code: workOrderRow.job_code!,
                        job_name: workOrderRow.job_name!,
                        job_category: workOrderRow.job_category,
                        job_standar: workOrderRow.job_standar,
                        job_type: workOrderRow.job_type,
                        job_critical: workOrderRow.job_critical,
                        job_internal: workOrderRow.job_internal,
                        estimated_hours: workOrderRow.estimated_hours,
                        job_desc: workOrderRow.job_desc,
                    });
            }
        }

        return Array.from(specificationGroups.values());
    }

    async getWorkOrderMasterById(
        id: number,
    ): Promise<WorkOrderMasterResponseDto | null> {
        const workOrderMaster =
            await this.workOrderMasterRepository.findById(id);

        return workOrderMaster
            ? this.toDto(workOrderMaster)
            : null;
    }

    async createWorkOrderMaster(
        data: WorkOrderMasterPayload,
    ): Promise<number> {
        return this.workOrderMasterRepository.create(data);
    }

    async updateWorkOrderMaster(
        id: number,
        data: WorkOrderMasterPayload,
    ): Promise<boolean> {
        return this.workOrderMasterRepository.update(id, data);
    }

    async deleteWorkOrderMaster(
        id: number,
    ): Promise<boolean> {
        return this.workOrderMasterRepository.delete(id);
    }

    private toDto(
        workOrderMaster: WorkOrderMaster,
    ): WorkOrderMasterResponseDto {
        return {
            id: workOrderMaster.id,
            specification_group_id: workOrderMaster.specificationGroupId,
            job_code: workOrderMaster.jobCode,
            job_name: workOrderMaster.jobName,
            job_category: workOrderMaster.jobCategory,
            job_standar: workOrderMaster.jobStandar,
            job_type: workOrderMaster.jobType,
            job_critical: workOrderMaster.jobCritical,
            job_internal: workOrderMaster.jobInternal,
            estimated_hours: workOrderMaster.estimatedHours,
            job_desc: workOrderMaster.jobDesc,
        };
    }
}