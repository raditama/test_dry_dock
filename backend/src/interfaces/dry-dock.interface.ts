import { PaginationQuery } from "../dtos/pagination.dto";
import {
    DryDockPayload,
    DryDockResponseDto,
    PaginatedDryDocks,
} from "../dtos/dry-dock.dto";
import { DryDock } from "../models/dry-dock.model";
import { IRepository } from "./repository.interface";

export interface IDryDockRepository extends IRepository<
    DryDock,
    DryDockPayload
> { }

export interface IDryDockService {
    getAllDryDocks(query: PaginationQuery): Promise<PaginatedDryDocks>;

    getDryDockById(id: number): Promise<DryDockResponseDto | null>;

    createDryDock(data: DryDockPayload): Promise<number>;

    updateDryDock(id: number, data: DryDockPayload): Promise<boolean>;

    deleteDryDock(id: number): Promise<boolean>;
}
