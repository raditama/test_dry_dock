import { Request, Response } from "express";
import { WorkOrderMasterService } from "../services/work-order-master.service";
import { WorkOrderMasterPayload } from "../dtos/work-order-master.dto";
import { sendError, sendSuccess } from "../shared/utils/response";
import { PaginationQuery } from "../dtos/pagination.dto";

export class WorkOrderMasterController {
    constructor(private workOrderMasterService: WorkOrderMasterService) { }

    getAllWorkOrderMasters = async (req: Request, res: Response): Promise<void> => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search
            ? String(req.query.search).trim()
            : undefined;

        if (page < 1) {
            sendError(res, 500, "INVALID_PARAMETER", "Page must be greater than 0");
            return;
        }

        if (limit < 1) {
            sendError(res, 500, "INVALID_PARAMETER", "Limit must be greater than 0");
            return;
        }

        const query: PaginationQuery = {
            page,
            limit,
            search,
        };

        const data = await this.workOrderMasterService.getAllWorkOrderMasters(query);

        sendSuccess(
            res,
            "Successfully retrieved data",
            data.data,
            undefined,
            data.pagination,
        );
    };

    getWorkOrderMasterById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 404, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const data = await this.workOrderMasterService.getWorkOrderMasterById(id);

        sendSuccess(res, "Successfully retrieved data", data);
    };

    createWorkOrderMaster = async (req: Request, res: Response): Promise<void> => {
        const {
            specification_group_id,
            job_code,
            job_name,
            job_category,
            job_standar,
            job_type,
            job_critical,
            job_internal,
            estimated_hours,
            job_desc,
        } = req.body;

        if (!specification_group_id || !job_code || !job_name) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: WorkOrderMasterPayload = {
            specification_group_id: Number(specification_group_id),
            job_code: String(job_code).trim(),
            job_name: String(job_name).trim(),
            job_category: job_category ? String(job_category).trim() : undefined,
            job_standar: job_standar ? String(job_standar).trim() : undefined,
            job_type: job_type ? String(job_type).trim() : undefined,
            job_critical: job_critical ? String(job_critical).trim() : undefined,
            job_internal: job_internal ? String(job_internal).trim() : undefined,
            estimated_hours: estimated_hours !== undefined
                ? Number(estimated_hours)
                : undefined,
            job_desc: job_desc ? String(job_desc).trim() : undefined,
        };

        await this.workOrderMasterService.createWorkOrderMaster(data);

        sendSuccess(res, "Successfully created data");
    };

    updateWorkOrderMaster = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const {
            specification_group_id,
            job_code,
            job_name,
            job_category,
            job_standar,
            job_type,
            job_critical,
            job_internal,
            estimated_hours,
            job_desc,
        } = req.body;

        if (!specification_group_id || !job_code || !job_name) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: WorkOrderMasterPayload = {
            specification_group_id: Number(specification_group_id),
            job_code: String(job_code).trim(),
            job_name: String(job_name).trim(),
            job_category: job_category ? String(job_category).trim() : undefined,
            job_standar: job_standar ? String(job_standar).trim() : undefined,
            job_type: job_type ? String(job_type).trim() : undefined,
            job_critical: job_critical ? String(job_critical).trim() : undefined,
            job_internal: job_internal ? String(job_internal).trim() : undefined,
            estimated_hours: estimated_hours !== undefined
                ? Number(estimated_hours)
                : undefined,
            job_desc: job_desc ? String(job_desc).trim() : undefined,
        };

        await this.workOrderMasterService.updateWorkOrderMaster(id, data);

        sendSuccess(res, "Successfully updated data");
    };

    deleteWorkOrderMaster = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        await this.workOrderMasterService.deleteWorkOrderMaster(id);

        sendSuccess(res, "Successfully deleted data");
    };
}
