import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export class SequelizeTeamModel extends Model {
    public competitionCode!: string;
    public competitionType!: string;

    public seasonYear!: string;

    public areaName!: string;
    public areaCode!: string;

    public teamName!: string;
    public shortName!: string;
    public tla!: string;
    public clubColors!: string | null;

    public coachName!: string | null;

    public venue!: string | null;

    public public_identifier!: string;
}

export function init(sequelize: Sequelize): void {
    SequelizeTeamModel.init(
        {
            competitionCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            competitionType: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            seasonYear: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            areaName: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            areaCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            shortName: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            tla: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            clubColors: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            coachName: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            venue: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            public_identifier: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                defaultValue: () => uuidv4(),
            },
        },
        {
            sequelize,
            modelName: "TeamsModel",
            tableName: "Teams",
            timestamps: false,
        }
    );
}
