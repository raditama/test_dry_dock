import { DryDockPriority, DryDockStatus } from "../models/dry-dock.model";

export interface DryDockPayload {
    vessel: string;
    dock_list_no: string;
    description?: string;
    shipyard_name?: string;
    shipyard_detail?: string;
    planned_start_date?: Date;
    planned_end_date?: Date;
    actual_start_date?: Date;
    actual_end_date?: Date;
    account_code?: string;
    budget?: number;
    responsible_bank?: string;
    status?: DryDockStatus;
    priority?: DryDockPriority;
}