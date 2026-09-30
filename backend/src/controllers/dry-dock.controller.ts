import { Request, Response } from "express";
import { DryDockService } from "../services/dry-dock.service";
import { DryDockPayload } from "../dtos/dry-dock.dto";
import { sendError, sendSuccess } from "../shared/utils/response";
import { PaginationQuery } from "../dtos/pagination.dto";
import { DryDockPriority, DryDockStatus } from "../interfaces/dry-dock.interface";

export class DryDockController {
    constructor(private dryDockService: DryDockService) { }

    getAllDryDocks = async (req: Request, res: Response): Promise<void> => {
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

        const data = await this.dryDockService.getAllDryDocks(query);

        sendSuccess(
            res,
            "Successfully retrieved data",
            data.data,
            undefined,
            data.pagination,
        );
    };

    getDryDockById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 404, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const data = await this.dryDockService.getDryDockById(id);

        sendSuccess(res, "Successfully retrieved data", data);
    };

    createDryDock = async (req: Request, res: Response): Promise<void> => {
        const {
            vessel,
            dock_list_no,
            description,
            shipyard_name,
            shipyard_detail,
            planned_start_date,
            planned_end_date,
            actual_start_date,
            actual_end_date,
            account_code,
            budget,
            responsible_bank,
            status,
            priority,
        } = req.body;

        if (!vessel || !dock_list_no) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const normalizedStatus = String(status || "PLANNING").toUpperCase();

        if (!["PLANNING", "EXECUTION", "COMPLETED"].includes(normalizedStatus)) {
            sendError(
                res,
                500,
                "INVALID_PARAMETER",
                "Status must be PLANNING, EXECUTION or COMPLETED",
            );
            return;
        }

        const normalizedPriority = String(priority || "MEDIUM").toUpperCase();

        if (!["LOW", "MEDIUM", "HIGH"].includes(normalizedPriority)) {
            sendError(
                res,
                500,
                "INVALID_PARAMETER",
                "Priority must be LOW, MEDIUM or HIGH",
            );
            return;
        }

        const data: DryDockPayload = {
            vessel: String(vessel).trim(),
            dock_list_no: String(dock_list_no).trim(),
            description: description ? String(description).trim() : undefined,
            shipyard_name: shipyard_name ? String(shipyard_name).trim() : undefined,
            shipyard_detail: shipyard_detail
                ? String(shipyard_detail).trim()
                : undefined,
            planned_start_date: planned_start_date || undefined,
            planned_end_date: planned_end_date || undefined,
            actual_start_date: actual_start_date || undefined,
            actual_end_date: actual_end_date || undefined,
            account_code: account_code ? String(account_code).trim() : undefined,
            budget:
                budget !== undefined && budget !== undefined
                    ? Number(budget)
                    : undefined,
            responsible_bank: responsible_bank
                ? String(responsible_bank).trim()
                : undefined,
            status: normalizedStatus as DryDockStatus,
            priority: normalizedPriority as DryDockPriority,
        };

        await this.dryDockService.createDryDock(data);

        sendSuccess(res, "Successfully created data");
    };

    updateDryDock = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        const {
            vessel,
            dock_list_no,
            description,
            shipyard_name,
            shipyard_detail,
            planned_start_date,
            planned_end_date,
            actual_start_date,
            actual_end_date,
            account_code,
            budget,
            responsible_bank,
            status,
            priority,
        } = req.body;

        if (!vessel || !dock_list_no) {
            sendError(res, 500, "INVALID_PARAMETER", "Required fields are missing");
            return;
        }

        const normalizedStatus = String(status || "PLANNING").toUpperCase();

        if (!["PLANNING", "EXECUTION", "COMPLETED"].includes(normalizedStatus)) {
            sendError(
                res,
                500,
                "INVALID_PARAMETER",
                "Status must be PLANNING, EXECUTION or COMPLETED",
            );
            return;
        }

        const normalizedPriority = String(priority || "MEDIUM").toUpperCase();

        if (!["LOW", "MEDIUM", "HIGH"].includes(normalizedPriority)) {
            sendError(
                res,
                500,
                "INVALID_PARAMETER",
                "Priority must be LOW, MEDIUM or HIGH",
            );
            return;
        }

        const data: DryDockPayload = {
            vessel: String(vessel).trim(),
            dock_list_no: String(dock_list_no).trim(),
            description: description ? String(description).trim() : undefined,
            shipyard_name: shipyard_name ? String(shipyard_name).trim() : undefined,
            shipyard_detail: shipyard_detail
                ? String(shipyard_detail).trim()
                : undefined,
            planned_start_date: planned_start_date || undefined,
            planned_end_date: planned_end_date || undefined,
            actual_start_date: actual_start_date || undefined,
            actual_end_date: actual_end_date || undefined,
            account_code: account_code ? String(account_code).trim() : undefined,
            budget:
                budget !== undefined && budget !== undefined
                    ? Number(budget)
                    : undefined,
            responsible_bank: responsible_bank
                ? String(responsible_bank).trim()
                : undefined,
            status: normalizedStatus as DryDockStatus,
            priority: normalizedPriority as DryDockPriority,
        };

        await this.dryDockService.updateDryDock(id, data);

        sendSuccess(res, "Successfully updated data");
    };

    deleteDryDock = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            sendError(res, 500, "INVALID_PARAMETER", "Invalid id");
            return;
        }

        await this.dryDockService.deleteDryDock(id);

        sendSuccess(res, "Successfully deleted data");
    };
}
