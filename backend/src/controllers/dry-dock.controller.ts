import { IDryDockService } from "../interfaces/dry-dock.interface";
import { BaseController } from "../shared/base/base.controller";
import { sendSuccess } from "../shared/utils/response";

export class DryDockController extends BaseController {
    constructor(private readonly dryDockService: IDryDockService) {
        super();
    }

    getAllDryDocks = this.handle(async (req, res) => {
        const query = this.parsePagination(req);

        const dryDocks = await this.dryDockService.getAllDryDocks(query);

        sendSuccess(
            res,
            "Successfully retrieved dry docks",
            dryDocks.data,
            undefined,
            dryDocks.pagination,
        );
    });

    getDryDockById = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const dryDock = await this.dryDockService.getDryDockById(id);

        if (!dryDock) {
            this.throwNotFound("Dry dock not found");
        }

        sendSuccess(res, "Successfully retrieved dry dock", dryDock);
    });

    createDryDock = this.handle(async (req, res) => {
        const id = await this.dryDockService.createDryDock(req.body);

        sendSuccess(res, "Successfully created dry dock", { id }, 201);
    });

    updateDryDock = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const updated = await this.dryDockService.updateDryDock(id, req.body);

        if (!updated) {
            this.throwNotFound("Dry dock not found");
        }

        sendSuccess(res, "Successfully updated dry dock");
    });

    deleteDryDock = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const deleted = await this.dryDockService.deleteDryDock(id);

        if (!deleted) {
            this.throwNotFound("Dry dock not found");
        }

        sendSuccess(res, "Successfully deleted dry dock");
    });
}
