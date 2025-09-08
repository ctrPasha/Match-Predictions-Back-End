import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
export class SequelizeMatchModel extends Model {
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

	public match_id!: number;
    public homeTeamPublicId!: string;
    public awayTeamPublicId!:string;
}

export function init(sequelize: Sequelize): void {
    SequelizeMatchModel.init(
        {
            areaName: {
                type: DataTypes.STRING,
                allowNull: false
            },

            areaCode: {
                type: DataTypes.STRING,
                allowNull: false
            },

            competitionCode: {
                type: DataTypes.STRING,
                allowNull: false
            },

            competitionType: {
                type: DataTypes.STRING,
                allowNull: false
            },

            seasonYear: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            homeTeamName: {
                type: DataTypes.STRING,
            },

            awayTeamName: {
                type: DataTypes.STRING,
            },

            scoreWinner: {
                type: DataTypes.STRING,
                allowNull: true
            },

            scoreDuration: {
                type: DataTypes.STRING
            },

            fullTimeHome: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            fullTimeAway: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            halfTimeHome: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            halfTimeAway: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

			match_id: {
				type: DataTypes.INTEGER,
				unique: true
			},

			matchDate: {
				type: DataTypes.STRING
			},

            homeTeamPublicId: {
                type: DataTypes.STRING,
                unique: false,
                allowNull: false
            },

             awayTeamPublicId: {
                type: DataTypes.STRING,
                unique: false,
                allowNull: false
            },

        },
        {
            sequelize,
            modelName: 'MatchesModel',
            tableName: 'Matches',
            timestamps: true
        }
    );
}
