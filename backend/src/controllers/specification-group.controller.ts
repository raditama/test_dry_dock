import { Request, Response } from "express";
import { SpecificationGroupService } from "../services/specification-group.service";
import { SpecificationGroupPayload } from "../dtos/specification-group.dto";
import { sendError, sendSuccess } from "../shared/utils/response";
import { PaginationQuery } from "../dtos/pagination.dto";

export class SpecificationGroupController {
    constructor(private specificationGroupService: SpecificationGroupService) { }

    getAllSpecificationGroups = async (req: Request, res: Response): Promise<void> => {
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

        const data = await this.specificationGroupService.getAllSpecificationGroups(query);

        sendSuccess(
            res,
            "Successfully retrieved data",
            data.data,
            undefined,
            data.pagination,
        );
    };

    getSpecificationGroupById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 404, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const data = await this.specificationGroupService.getSpecificationGroupById(id);

        sendSuccess(res, "Successfully retrieved data", data);
    };

    createSpecificationGroup = async (req: Request, res: Response): Promise<void> => {
        const {
            group_no,
            name,
            sort_order,
        } = req.body;

        if (!group_no || !name || !sort_order) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: SpecificationGroupPayload = {
            group_no: String(group_no).trim(),
            name: String(name).trim(),
            sort_order: sort_order,
        };

        await this.specificationGroupService.createSpecificationGroup(data);

        sendSuccess(res, "Successfully created data");
    };

    updateSpecificationGroup = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const {
            group_no,
            name,
            sort_order,
        } = req.body;

        if (!group_no || !name || !sort_order) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const data: SpecificationGroupPayload = {
            group_no: String(group_no).trim(),
            name: String(name).trim(),
            sort_order: sort_order,
        };

        await this.specificationGroupService.updateSpecificationGroup(id, data);

        sendSuccess(res, "Successfully updated data");
    };

    deleteSpecificationGroup = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        await this.specificationGroupService.deleteSpecificationGroup(id);

        sendSuccess(res, "Successfully deleted data");
    };
}
