import { DataTypes, Model, Sequelize } from 'sequelize';
import { transpileModule } from 'typescript';
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
    public duration!: string;

    public fullTimeHome!: number;
    public fullTimeAway!: number;

    public halfTimeHome!: number;
    public halfTimeAway!: number;

    public regularTimeHome!: number;
    public regularTimeAway!: number;

    public extraTimeHome!: number;
    public extraTimeAway!: number;

    public penaltiesHome!: number;
    public penaltiesAway!: number;

	public match_id!: number;
    public status!: string;
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

            duration: {
                type: DataTypes.STRING,
                allowNull: true
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

            regularTimeHome: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            regularTimeAway: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            extraTimeHome: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            extraTimeAway: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            penaltiesHome: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            penaltiesAway: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

			match_id: {
				type: DataTypes.INTEGER,
				unique: true
			},

            status: {
                type: DataTypes.STRING,
                allowNull: true
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
