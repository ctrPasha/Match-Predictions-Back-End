import * as Models from '../models/index';

import { Sequelize } from 'sequelize';

let sequelizeConnection: Sequelize | undefined = undefined;

export function connect(): Sequelize {
    const nodeEnv = (process.env.NODE_ENV || '').trim().toLowerCase();
    const db = nodeEnv == 'test' ? 'test' : 'dev';

    sequelizeConnection = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3300, 
        username: 'root',
        password: '123456',
        database: db
    });

    return sequelizeConnection;
}

export async function init(): Promise<Sequelize> {
    const connection = sequelizeConnection ? sequelizeConnection : connect();

    Models.discoverModels(connection);

    // This is crucial to setup db, ensuring a new table is created
    // if one hasnt existed, while keeping others untouched.
    await connection.sync();

    return connection;
}
