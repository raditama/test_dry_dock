import { Router } from 'express';
import { ChecklistController } from '../controllers/checklist.controller';
import { IRoute } from '../interfaces/route.interface';

export class ChecklistRoutes implements IRoute {
    public readonly path = '/api/checklist';
    public readonly router: Router = Router();

    constructor(
        private readonly checklistController: ChecklistController
    ) {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            '/',
            this.checklistController.getAllChecklists,
        );
        this.router.get(
            '/:id',
            this.checklistController.getChecklistById,
        );
        this.router.post(
            '/',
            this.checklistController.createChecklist,
        );
        this.router.put(
            '/:id',
            this.checklistController.updateChecklist,
        );
        this.router.delete(
            '/:id',
            this.checklistController.deleteChecklist,
        );
    }
}
