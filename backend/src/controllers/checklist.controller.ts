import { IChecklistService } from "../interfaces/checklist.interface";
import { BaseController } from "../shared/base/base.controller";
import { sendSuccess } from "../shared/utils/response";

export class ChecklistController extends BaseController {
    constructor(private readonly checklistService: IChecklistService) {
        super();
    }

    getAllChecklists = this.handle(async (req, res) => {
        const query = this.parsePagination(req);

        const checklists = await this.checklistService.getAllChecklists(query);

        sendSuccess(
            res,
            "Successfully retrieved checklist",
            checklists.data,
            undefined,
            checklists.pagination,
        );
    });

    getChecklistById = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const checklist = await this.checklistService.getChecklistById(id);

        if (!checklist) {
            this.throwNotFound("Checklist not found");
        }

        sendSuccess(res, "Successfully retrieved checklist", checklist);
    });

    createChecklist = this.handle(async (req, res) => {
        const id = await this.checklistService.createChecklist(req.body);

        sendSuccess(res, "Successfully created checklist", { id }, 201);
    });

    updateChecklist = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const updated = await this.checklistService.updateChecklist(id, req.body);

        if (!updated) {
            this.throwNotFound("Checklist not found");
        }

        sendSuccess(res, "Successfully updated checklist");
    });

    deleteChecklist = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const deleted = await this.checklistService.deleteChecklist(id);

        if (!deleted) {
            this.throwNotFound("Checklist not found");
        }

        sendSuccess(res, "Successfully deleted checklist");
    });
}
