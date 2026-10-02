import { BaseModel } from '../shared/base/base.model';

export class ChecklistItem extends BaseModel {
    constructor(
        id: number,
        private readonly _checklistId: number,
        private readonly _title: string,
        private readonly _data_type: string,
    ) {
        super(id);
    }

    get checklistId(): number {
        return this._checklistId;
    }

    get title(): string {
        return this._title;
    }

    get data_type(): string {
        return this._data_type;
    }
}