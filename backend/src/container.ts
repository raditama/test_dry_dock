import dbPool from "./config/database";
import { IRoute } from "./interfaces/route.interface";

import { ChecklistController } from "./controllers/checklist.controller";
import { ChecklistItemController } from "./controllers/checklist-item.controller";
import { DryDockController } from "./controllers/dry-dock.controller";
import { SpecificationGroupController } from "./controllers/specification-group.controller";
import { WorkOrderMasterController } from "./controllers/work-order-master.controller";

import { ChecklistRepository } from "./repositories/checklist.repository";
import { ChecklistItemRepository } from "./repositories/checklist-item.repository";
import { DryDockRepository } from "./repositories/dry-dock.repository";
import { SpecificationGroupRepository } from "./repositories/specification-group.repository";
import { WorkOrderMasterRepository } from "./repositories/work-order-master.repository";

import { ChecklistRoutes } from "./routes/checklist.routes";
import { ChecklistItemRoutes } from "./routes/checklist-item.routes";
import { DryDockRoutes } from "./routes/dry-dock.routes";
import { SpecificationGroupRoutes } from "./routes/specification-group.routes";
import { WorkOrderMasterRoutes } from "./routes/work-order-master.routes";

import { ChecklistService } from "./services/checklist.service";
import { ChecklistItemService } from "./services/checklist-item.service";
import { DryDockService } from "./services/dry-dock.service";
import { SpecificationGroupService } from "./services/specification-group.service";
import { WorkOrderMasterService } from "./services/work-order-master.service";

const checklistRepository = new ChecklistRepository(dbPool);
const checklistService = new ChecklistService(checklistRepository);
const checklistController = new ChecklistController(checklistService);

const checklistItemRepository = new ChecklistItemRepository(dbPool);
const checklistItemService = new ChecklistItemService(checklistItemRepository);
const checklistItemController = new ChecklistItemController(checklistItemService);

const dryDockRepository = new DryDockRepository(dbPool);
const dryDockService = new DryDockService(dryDockRepository);
const dryDockController = new DryDockController(dryDockService);

const specificationGroupRepository = new SpecificationGroupRepository(dbPool);
const specificationGroupService = new SpecificationGroupService(specificationGroupRepository);
const specificationGroupController = new SpecificationGroupController(specificationGroupService);

const workOrderMasterRepository = new WorkOrderMasterRepository(dbPool);
const workOrderMasterService = new WorkOrderMasterService(workOrderMasterRepository);
const workOrderMasterController = new WorkOrderMasterController(workOrderMasterService);

export const routes: IRoute[] = [
    new ChecklistRoutes(checklistController),
    new ChecklistItemRoutes(checklistItemController),
    new DryDockRoutes(dryDockController),
    new SpecificationGroupRoutes(specificationGroupController),
    new WorkOrderMasterRoutes(workOrderMasterController),
];
