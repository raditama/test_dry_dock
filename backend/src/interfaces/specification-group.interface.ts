import { PaginationQuery } from "../dtos/pagination.dto";
import {
    PaginatedSpecificationGroups,
    SpecificationGroupOptionDto,
    SpecificationGroupPayload,
    SpecificationGroupResponseDto,
} from "../dtos/specification-group.dto";
import { SpecificationGroup } from "../models/specification-group.model";
import { IRepository } from "./repository.interface";

export interface ISpecificationGroupRepository extends IRepository<
    SpecificationGroup,
    SpecificationGroupPayload
> {
    getOptions(): Promise<SpecificationGroupOptionDto[]>;
}

export interface ISpecificationGroupService {
    getAllSpecificationGroups(
        query: PaginationQuery,
    ): Promise<PaginatedSpecificationGroups>;

    getSpecificationGroupById(
        id: number,
    ): Promise<SpecificationGroupResponseDto | null>;

    createSpecificationGroup(data: SpecificationGroupPayload): Promise<number>;

    updateSpecificationGroup(
        id: number,
        data: SpecificationGroupPayload,
    ): Promise<boolean>;

    deleteSpecificationGroup(id: number): Promise<boolean>;

    getSpecificationGroupOptions(): Promise<SpecificationGroupOptionDto[]>;
}
