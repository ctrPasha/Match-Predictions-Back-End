import { DataTypes, Model, Sequelize } from 'sequelize';
// import sequelize from '../db/database';

export class SequelizeCounterModel extends Model {
    public id!: string;
    public counter!: number;
};

export function init(sequelize: Sequelize): void {
    SequelizeCounterModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            counter: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0
                }
            }, 
        }, 
        {
            sequelize,
            modelName: 'counter'
        },
    );
} 

/*
const Counter = sequelize.define(
    'Counter',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        counter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: 'Counter',
    }
);

export default Counter;*/