import { Router } from "express";
import { ChecklistItemController } from "../controllers/checklist-item.controller";
import { IRoute } from "../interfaces/route.interface";

export class ChecklistItemRoutes implements IRoute {
    public readonly path = "/api/checklist-item";
    public readonly router: Router = Router();

    constructor(
        private readonly checklistItemController: ChecklistItemController,
    ) {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            "/",
            this.checklistItemController.getAllChecklistItems,
        );
        this.router.get(
            "/:id",
            this.checklistItemController.getChecklistItemById,
        );
        this.router.post(
            "/",
            this.checklistItemController.createChecklistItem,
        );
        this.router.put(
            "/:id",
            this.checklistItemController.updateChecklistItem,
        );
        this.router.delete(
            "/:id",
            this.checklistItemController.deleteChecklistItem,
        );
    }
}
