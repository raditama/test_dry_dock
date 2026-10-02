import { Pagination, PaginationQuery } from '../dtos/pagination.dto';
import { SpecificationGroupPayload } from '../dtos/specification-group.dto';
import { SpecificationGroup } from '../models/specification-group.model';
import { IRepository } from './repository.interface';

export interface SpecificationGroupResponseDto {
    id: number;
    group_no: string;
    name: string;
    sort_order: number;
}

export interface PaginatedSpecificationGroups {
    data: SpecificationGroupResponseDto[];
    pagination: Pagination;
}

export interface SpecificationGroupOptionDto {
    id: number;
    name: string;
}

export interface ISpecificationGroupRepository
    extends IRepository<SpecificationGroup, SpecificationGroupPayload> {
    getOptions(): Promise<SpecificationGroupOptionDto[]>;
}

export interface ISpecificationGroupService {
    getAllSpecificationGroups(
        query: PaginationQuery,
    ): Promise<PaginatedSpecificationGroups>;

    getSpecificationGroupById(
        id: number,
    ): Promise<SpecificationGroupResponseDto | null>;

    createSpecificationGroup(
        data: SpecificationGroupPayload,
    ): Promise<number>;

    updateSpecificationGroup(
        id: number,
        data: SpecificationGroupPayload,
    ): Promise<boolean>;

    deleteSpecificationGroup(
        id: number,
    ): Promise<boolean>;

    getSpecificationGroupOptions(): Promise<SpecificationGroupOptionDto[]>;
}