import { BaseModel } from '../shared/base/base.model';

export class SpecificationGroup extends BaseModel {
    constructor(
        id: number,
        private readonly _groupNo: string,
        private readonly _name: string,
        private readonly _sortOrder: number,
    ) {
        super(id);
    }

    get groupNo(): string {
        return this._groupNo;
    }

    get name(): string {
        return this._name;
    }

    get sortOrder(): number {
        return this._sortOrder;
    }
}