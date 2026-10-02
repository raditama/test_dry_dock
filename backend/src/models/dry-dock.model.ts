import { BaseModel } from '../shared/base/base.model';

export type DryDockStatus = 'PLANNING' | 'EXECUTION' | 'COMPLETED';
export type DryDockPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export class DryDock extends BaseModel {
    constructor(
        id: number,
        private readonly _vessel: string,
        private readonly _dockListNo: string,
        private readonly _description: string | null,
        private readonly _shipyardName: string | null,
        private readonly _shipyardDetail: string | null,
        private readonly _plannedStartDate: Date | null,
        private readonly _plannedEndDate: Date | null,
        private readonly _actualStartDate: Date | null,
        private readonly _actualEndDate: Date | null,
        private readonly _accountCode: string | null,
        private readonly _budget: number | null,
        private readonly _responsibleBank: string | null,
        private readonly _status: DryDockStatus,
        private readonly _priority: DryDockPriority,
    ) {
        super(id);
    }

    get vessel(): string {
        return this._vessel;
    }

    get dockListNo(): string {
        return this._dockListNo;
    }

    get description(): string | null {
        return this._description;
    }

    get shipyardName(): string | null {
        return this._shipyardName;
    }

    get shipyardDetail(): string | null {
        return this._shipyardDetail;
    }

    get plannedStartDate(): Date | null {
        return this._plannedStartDate;
    }

    get plannedEndDate(): Date | null {
        return this._plannedEndDate;
    }

    get actualStartDate(): Date | null {
        return this._actualStartDate;
    }

    get actualEndDate(): Date | null {
        return this._actualEndDate;
    }

    get accountCode(): string | null {
        return this._accountCode;
    }

    get budget(): number | null {
        return this._budget;
    }

    get responsibleBank(): string | null {
        return this._responsibleBank;
    }

    get status(): DryDockStatus {
        return this._status;
    }

    get priority(): DryDockPriority {
        return this._priority;
    }
}