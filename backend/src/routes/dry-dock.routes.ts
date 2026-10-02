import { Router } from "express";
import { DryDockController } from "../controllers/dry-dock.controller";
import { IRoute } from "../interfaces/route.interface";

export class DryDockRoutes implements IRoute {
    public readonly path = "/api/dry-dock";
    public readonly router: Router = Router();

    constructor(
        private readonly dryDockController: DryDockController
    ) {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            "/", 
            this.dryDockController.getAllDryDocks,
        );
        this.router.get(
            "/:id", 
            this.dryDockController.getDryDockById,
        );
        this.router.post(
            "/", 
            this.dryDockController.createDryDock,
        );
        this.router.put(
            "/:id", 
            this.dryDockController.updateDryDock,
        );
        this.router.delete(
            "/:id", 
            this.dryDockController.deleteDryDock,
        );
    }
}
