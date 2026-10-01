import { Request, Response } from "express";
import { ChecklistService } from "../services/checklist.service";
import { ChecklistPayload } from "../dtos/checklist.dto";
import { sendError, sendSuccess } from "../shared/utils/response";
import { PaginationQuery } from "../dtos/pagination.dto";

export class ChecklistController {
    constructor(private checklistService: ChecklistService) { }

    getAllChecklists = async (req: Request, res: Response): Promise<void> => {
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

        const data = await this.checklistService.getAllChecklists(query);

        sendSuccess(
            res,
            "Successfully retrieved data",
            data.data,
            undefined,
            data.pagination,
        );
    };

    getChecklistById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 404, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const data = await this.checklistService.getChecklistById(id);

        sendSuccess(res, "Successfully retrieved data", data);
    };

    createChecklist = async (req: Request, res: Response): Promise<void> => {
        const {
            name,
            description,
            is_active,
        } = req.body;

        if (!name || is_active === undefined || is_active === null) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: ChecklistPayload = {
            name: String(name).trim(),
            description: description ? String(description).trim() : undefined,
            is_active: is_active,
        };

        await this.checklistService.createChecklist(data);

        sendSuccess(res, "Successfully created data");
    };

    updateChecklist = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const {
            name,
            description,
            is_active,
        } = req.body;

        if (!name || is_active === undefined || is_active === null) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: ChecklistPayload = {
            name: String(name).trim(),
            description: description ? String(description).trim() : undefined,
            is_active: is_active,
        };

        await this.checklistService.updateChecklist(id, data);

        sendSuccess(res, "Successfully updated data");
    };

    deleteChecklist = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        await this.checklistService.deleteChecklist(id);

        sendSuccess(res, "Successfully deleted data");
    };
}
