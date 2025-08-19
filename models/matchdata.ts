import { DataTypes, Model, Sequelize } from "sequelize";

export class SequelizeMatchModel extends Model {
	//public id!: number;
	
	public areaName!: string;
    public areaCode!: string;

	public competitionCode!: string;
    public competitionType!: string;

	public seasonYear!: string;

	public homeTeamName!: string;
	public awayTeamName!: string;

	public scoreWinner!: string;
	public scoreDuration!: string;

	public fulltimeHome!: number;
	public fullTimeAway!: number;

	public halfTimeHome!: number;
	public halfTmeAway!: number;

	
}

export function init(sequelize: Sequelize): void {
	SequelizeMatchModel.init(
		{
			
		},
		{
			sequelize,
			modelName: "MatchesModel",
			tableName: "Matches",
			timestamps: true
		}
	);
}
