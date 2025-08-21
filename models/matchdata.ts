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
    public public_identifier!: string;
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
                type: DataTypes.STRING
            },

            scoreDuration: {
                type: DataTypes.STRING
            },

            fullTimeHome: {
                type: DataTypes.INTEGER
            },

            fullTimeAway: {
                type: DataTypes.INTEGER
            },

            halfTimeHome: {
                type: DataTypes.INTEGER
            },

            halfTimeAway: {
                type: DataTypes.INTEGER
            },

			match_id: {
				type: DataTypes.INTEGER,
				unique: true
			},

			matchDate: {
				type: DataTypes.STRING
			},

            public_identifier: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                defaultValue: () => uuidv4()
            }
        },
        {
            sequelize,
            modelName: 'MatchesModel',
            tableName: 'Matches',
            timestamps: true
        }
    );
}
