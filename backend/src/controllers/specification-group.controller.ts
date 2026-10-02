import { ISpecificationGroupService } from '../interfaces/specification-group.interface';
import { BaseController } from '../shared/base/base.controller';
import { sendSuccess } from '../shared/utils/response';

export class SpecificationGroupController extends BaseController {
    constructor(
        private readonly specificationGroupService: ISpecificationGroupService,
    ) {
        super();
    }

    getAllSpecificationGroups = this.handle(async (req, res) => {
        const query = this.parsePagination(req);

        const specificationGroups =
            await this.specificationGroupService
                .getAllSpecificationGroups(query);

        sendSuccess(
            res,
            'Successfully retrieved specification groups',
            specificationGroups.data,
            undefined,
            specificationGroups.pagination,
        );
    });

    getSpecificationGroupById = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const specificationGroup =
            await this.specificationGroupService
                .getSpecificationGroupById(id);

        if (!specificationGroup) {
            this.throwNotFound('Specification group not found');
        }

        sendSuccess(
            res,
            'Successfully retrieved specification group',
            specificationGroup,
        );
    });

    createSpecificationGroup = this.handle(async (req, res) => {
        const id =
            await this.specificationGroupService
                .createSpecificationGroup(req.body);

        sendSuccess(
            res,
            'Successfully created specification group',
            { id },
            201,
        );
    });

    updateSpecificationGroup = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const updated =
            await this.specificationGroupService
                .updateSpecificationGroup(
                    id,
                    req.body,
                );

        if (!updated) {
            this.throwNotFound('Specification group not found');
        }

        sendSuccess(
            res,
            'Successfully updated specification group',
        );
    });

    deleteSpecificationGroup = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const deleted =
            await this.specificationGroupService
                .deleteSpecificationGroup(id);

        if (!deleted) {
            this.throwNotFound('Specification group not found');
        }

        sendSuccess(
            res,
            'Successfully deleted specification group',
        );
    });

    getSpecificationGroupOptions = this.handle(async (req, res) => {
        const specificationGroups =
            await this.specificationGroupService
                .getSpecificationGroupOptions();

        sendSuccess(
            res,
            'Successfully retrieved specification group options',
            specificationGroups,
        );
    });
}