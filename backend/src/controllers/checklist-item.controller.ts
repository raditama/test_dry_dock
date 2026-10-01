import { Request, Response } from "express";
import { ChecklistItemService } from "../services/checklist-item.service";
import { ChecklistItemPayload } from "../dtos/checklist-item.dto";
import { sendError, sendSuccess } from "../shared/utils/response";
import { PaginationQuery } from "../dtos/pagination.dto";

export class ChecklistItemController {
    constructor(private checklistItemService: ChecklistItemService) { }

    getAllChecklistItems = async (req: Request, res: Response): Promise<void> => {
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

        const data = await this.checklistItemService.getAllChecklistItems(query);

        sendSuccess(
            res,
            "Successfully retrieved data",
            data.data,
            undefined,
            data.pagination,
        );
    };

    getChecklistItemById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 404, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const data = await this.checklistItemService.getChecklistItemById(id);

        sendSuccess(res, "Successfully retrieved data", data);
    };

    createChecklistItem = async (req: Request, res: Response): Promise<void> => {
        const {
            checklist_id,
            title,
        } = req.body;

        if (!checklist_id || !title) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: ChecklistItemPayload = {
            checklist_id: checklist_id,
            title: String(title).trim(),
        };

        await this.checklistItemService.createChecklistItem(data);

        sendSuccess(res, "Successfully created data");
    };

    updateChecklistItem = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const {
            checklist_id,
            title,
        } = req.body;

        if (!checklist_id || !title) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: ChecklistItemPayload = {
            checklist_id: checklist_id,
            title: String(title).trim(),
        };

        await this.checklistItemService.updateChecklistItem(id, data);

        sendSuccess(res, "Successfully updated data");
    };

    deleteChecklistItem = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        await this.checklistItemService.deleteChecklistItem(id);

        sendSuccess(res, "Successfully deleted data");
    };
}
