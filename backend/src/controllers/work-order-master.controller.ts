import { IWorkOrderMasterService } from '../interfaces/work-order-master.interface';
import { BaseController } from '../shared/base/base.controller';
import { sendSuccess } from '../shared/utils/response';

export class WorkOrderMasterController extends BaseController {
    constructor(
        private readonly workOrderMasterService: IWorkOrderMasterService,
    ) {
        super();
    }

    getAllWorkOrderMasters = this.handle(async (req, res) => {
        const search =
            typeof req.query.search === 'string'
                ? req.query.search
                : undefined;

        const workOrderGroups =
            await this.workOrderMasterService
                .getAllWorkOrderMasters(search);

        sendSuccess(
            res,
            'Successfully retrieved data',
            workOrderGroups,
        );
    });

    getWorkOrderMasterById = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const workOrderMaster =
            await this.workOrderMasterService
                .getWorkOrderMasterById(id);

        if (!workOrderMaster) {
            this.throwNotFound('Work order master not found');
        }

        sendSuccess(
            res,
            'Successfully retrieved work order master',
            workOrderMaster,
        );
    });

    createWorkOrderMaster = this.handle(async (req, res) => {
        const id =
            await this.workOrderMasterService
                .createWorkOrderMaster(req.body);

        sendSuccess(
            res,
            'Successfully created work order master',
            { id },
            201,
        );
    });

    updateWorkOrderMaster = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const updated =
            await this.workOrderMasterService
                .updateWorkOrderMaster(
                    id,
                    req.body,
                );

        if (!updated) {
            this.throwNotFound('Work order master not found');
        }

        sendSuccess(
            res,
            'Successfully updated work order master',
        );
    });

    deleteWorkOrderMaster = this.handle(async (req, res) => {
        const id = this.parseId(req);

        const deleted =
            await this.workOrderMasterService
                .deleteWorkOrderMaster(id);

        if (!deleted) {
            this.throwNotFound('Work order master not found');
        }

        sendSuccess(
            res,
            'Successfully deleted work order master',
        );
    });
}