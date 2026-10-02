import { BaseModel } from '../shared/base/base.model';

export class WorkOrderMaster extends BaseModel {
    constructor(
        id: number,
        private readonly _specificationGroupId: number,
        private readonly _jobCode: string,
        private readonly _jobName: string,
        private readonly _jobCategory: string | null,
        private readonly _jobStandar: string | null,
        private readonly _jobType: string | null,
        private readonly _jobCritical: string | null,
        private readonly _jobInternal: string | null,
        private readonly _estimatedHours: number | null,
        private readonly _jobDesc: string | null,
    ) {
        super(id);
    }

    get specificationGroupId(): number {
        return this._specificationGroupId;
    }

    get jobCode(): string {
        return this._jobCode;
    }

    get jobName(): string {
        return this._jobName;
    }

    get jobCategory(): string | null {
        return this._jobCategory;
    }

    get jobStandar(): string | null {
        return this._jobStandar;
    }

    get jobType(): string | null {
        return this._jobType;
    }

    get jobCritical(): string | null {
        return this._jobCritical;
    }

    get jobInternal(): string | null {
        return this._jobInternal;
    }

    get estimatedHours(): number | null {
        return this._estimatedHours;
    }

    get jobDesc(): string | null {
        return this._jobDesc;
    }
}