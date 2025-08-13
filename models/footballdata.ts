import { DataTypes, Model, Sequelize } from "sequelize";
import { StringLiteral } from "typescript";

export class SequelizeTeamModel extends Model {
	public id!: number;

	public areaName!: string;

}

export function init(sequelize: Sequelize): void {
	SequelizeTeamModel.init(
		{
			
		},
		{
			sequelize,
			modelName: "PastMatches",
			timestamps: false
		}
	);
}

