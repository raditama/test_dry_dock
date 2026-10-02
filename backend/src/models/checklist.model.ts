import { BaseModel } from '../shared/base/base.model';

export class Checklist extends BaseModel {
    constructor(
        id: number,
        private readonly _name: string,
        private readonly _description: string | null,
        private readonly _isActive: boolean,
    ) {
        super(id);
    }

    get name(): string {
        return this._name;
    }

    get description(): string | null {
        return this._description;
    }

    get isActive(): boolean {
        return this._isActive;
    }
}