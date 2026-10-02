import { PaginationQuery } from "../dtos/pagination.dto";
import {
    ChecklistPayload,
    ChecklistResponseDto,
    PaginatedChecklists,
} from "../dtos/checklist.dto";
import { Checklist } from "../models/checklist.model";
import { IRepository } from "./repository.interface";

export interface IChecklistRepository extends IRepository<
    Checklist,
    ChecklistPayload
> { }

export interface IChecklistService {
    getAllChecklists(query: PaginationQuery): Promise<PaginatedChecklists>;

    getChecklistById(id: number): Promise<ChecklistResponseDto | null>;

    createChecklist(data: ChecklistPayload): Promise<number>;

    updateChecklist(id: number, data: ChecklistPayload): Promise<boolean>;

    deleteChecklist(id: number): Promise<boolean>;
}
