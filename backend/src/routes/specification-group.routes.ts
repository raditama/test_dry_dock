import { Router } from "express";
import { SpecificationGroupController } from "../controllers/specification-group.controller";
import { IRoute } from "../interfaces/route.interface";

export class SpecificationGroupRoutes implements IRoute {
    public readonly path = "/api/specification-group";
    public readonly router: Router = Router();

    constructor(
        private readonly specificationGroupController: SpecificationGroupController,
    ) {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            "/options",
            this.specificationGroupController.getSpecificationGroupOptions,
        );
        this.router.get(
            "/",
            this.specificationGroupController.getAllSpecificationGroups,
        );
        this.router.get(
            "/:id",
            this.specificationGroupController.getSpecificationGroupById,
        );
        this.router.post(
            "/",
            this.specificationGroupController.createSpecificationGroup,
        );
        this.router.put(
            "/:id",
            this.specificationGroupController.updateSpecificationGroup,
        );
        this.router.delete(
            "/:id",
            this.specificationGroupController.deleteSpecificationGroup,
        );
    }
}
