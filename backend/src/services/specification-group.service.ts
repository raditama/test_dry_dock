import { PaginationQuery } from "../dtos/pagination.dto";
import {
    PaginatedSpecificationGroups,
    SpecificationGroupOptionDto,
    SpecificationGroupPayload,
    SpecificationGroupResponseDto,
} from "../dtos/specification-group.dto";
import {
    ISpecificationGroupRepository,
    ISpecificationGroupService,
} from "../interfaces/specification-group.interface";
import { SpecificationGroup } from "../models/specification-group.model";
import { BaseService } from "../shared/base/base.service";

export class SpecificationGroupService
    extends BaseService
    implements ISpecificationGroupService {
    constructor(
        private readonly specificationGroupRepository: ISpecificationGroupRepository,
    ) {
        super();
    }

    async getAllSpecificationGroups(
        query: PaginationQuery,
    ): Promise<PaginatedSpecificationGroups> {
        const { data, total } =
            await this.specificationGroupRepository.findAll(query);

        return {
            data: data.map((specificationGroup) => this.toDto(specificationGroup)),
            pagination: this.buildPagination(total, query),
        };
    }

    async getSpecificationGroupById(
        id: number,
    ): Promise<SpecificationGroupResponseDto | null> {
        const specificationGroup =
            await this.specificationGroupRepository.findById(id);

        return specificationGroup ? this.toDto(specificationGroup) : null;
    }

    async createSpecificationGroup(
        data: SpecificationGroupPayload,
    ): Promise<number> {
        return this.specificationGroupRepository.create(data);
    }

    async updateSpecificationGroup(
        id: number,
        data: SpecificationGroupPayload,
    ): Promise<boolean> {
        return this.specificationGroupRepository.update(id, data);
    }

    async deleteSpecificationGroup(id: number): Promise<boolean> {
        return this.specificationGroupRepository.delete(id);
    }

    private toDto(
        specificationGroup: SpecificationGroup,
    ): SpecificationGroupResponseDto {
        return {
            id: specificationGroup.id,
            group_no: specificationGroup.groupNo,
            name: specificationGroup.name,
            sort_order: specificationGroup.sortOrder,
        };
    }

    async getSpecificationGroupOptions(): Promise<SpecificationGroupOptionDto[]> {
        return this.specificationGroupRepository.getOptions();
    }
}
