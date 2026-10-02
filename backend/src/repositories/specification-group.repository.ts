import { RowDataPacket } from "mysql2/promise";
import { ISpecificationGroupRepository, SpecificationGroupOptionDto } from "../interfaces/specification-group.interface";
import { SpecificationGroupPayload } from "../dtos/specification-group.dto";
import { BaseRepository } from "../shared/base/base.repository";
import { SpecificationGroup } from "../models/specification-group.model";

interface SpecificationGroupRow extends RowDataPacket {
    id: number;
    group_no: string;
    name: string;
    sort_order: number;
}

interface SpecificationGroupOptionRow extends RowDataPacket {
    id: number;
    name: string;
}

export class SpecificationGroupRepository
    extends BaseRepository<
        SpecificationGroup,
        SpecificationGroupRow,
        SpecificationGroupPayload
    >
    implements ISpecificationGroupRepository {
    protected readonly tableName = "specification_group";

    protected readonly columns = [
        "id",
        "group_no",
        "name",
        "sort_order",
    ] as const;

    protected readonly searchableColumns = [
        "group_no",
        "name",
    ] as const;

    protected readonly orderBy = "sort_order ASC";

    protected toEntity(row: SpecificationGroupRow): SpecificationGroup {
        return new SpecificationGroup(
            row.id,
            row.group_no,
            row.name,
            row.sort_order,
        );
    }

    async getOptions(): Promise<SpecificationGroupOptionDto[]> {
        const query = `
            SELECT id, name
            FROM specification_group
            ORDER BY sort_order ASC
        `;

        const [rows] =
            await this.db.execute<SpecificationGroupOptionRow[]>(query);

        return rows;
    }
}
