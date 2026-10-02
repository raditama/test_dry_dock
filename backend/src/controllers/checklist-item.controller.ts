import { IChecklistItemService } from "../interfaces/checklist-item.interface";
import { BaseController } from "../shared/base/base.controller";
import { sendSuccess } from "../shared/utils/response";

export class ChecklistItemController extends BaseController {
    constructor(private readonly checklistItemService: IChecklistItemService) {
        super();
    }

    getAllChecklistItems = this.handle(async (req, res) => {
        const query = this.parsePagination(req);

        const checklistId =
            typeof req.query.checklist_id === 'string'
                ? Number(req.query.checklist_id)
                : undefined;

        const checklistItems =
            await this.checklistItemService.getAllChecklistItems({
                ...query,
                checklist_id: checklistId,
            });

        sendSuccess(
            res,
            "Successfully retrieved checklist items",
            checklistItems.data,
            undefined,
            checklistItems.pagination,
        );
    });

    getChecklistItemById = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const checklistItem =
            await this.checklistItemService.getChecklistItemById(id);

        if (!checklistItem) {
            this.throwNotFound("Checklist item not found");
        }

        sendSuccess(res, "Successfully retrieved checklist item", checklistItem);
    });

    createChecklistItem = this.handle(async (req, res) => {
        const id = await this.checklistItemService.createChecklistItem(req.body);

        sendSuccess(res, "Successfully created checklist item", { id }, 201);
    });

    updateChecklistItem = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const updated = await this.checklistItemService.updateChecklistItem(
            id,
            req.body,
        );

        if (!updated) {
            this.throwNotFound("Checklist item not found");
        }

        sendSuccess(res, "Successfully updated checklist item");
    });

    deleteChecklistItem = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const deleted = await this.checklistItemService.deleteChecklistItem(id);

        if (!deleted) {
            this.throwNotFound("Checklist item not found");
        }

        sendSuccess(res, "Successfully deleted checklist item");
    });
}
