import { Router } from "express";
import { WorkOrderMasterController } from "../controllers/work-order-master.controller";
import { IRoute } from "../interfaces/route.interface";

export class WorkOrderMasterRoutes implements IRoute {
    public readonly path = "/api/work-order-master";
    public readonly router: Router = Router();

    constructor(
        private readonly workOrderMasterController: WorkOrderMasterController,
    ) {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            "/",
            this.workOrderMasterController.getAllWorkOrderMasters
        );
        this.router.get(
            "/:id",
            this.workOrderMasterController.getWorkOrderMasterById,
        );
        this.router.post(
            "/",
            this.workOrderMasterController.createWorkOrderMaster
        );
        this.router.put(
            "/:id",
            this.workOrderMasterController.updateWorkOrderMaster,
        );
        this.router.delete(
            "/:id",
            this.workOrderMasterController.deleteWorkOrderMaster,
        );
    }
}
