import * as Models from "../models/index"

import { Sequelize } from "sequelize";

let sequelizeConnection: Sequelize | undefined = undefined;

export function connect(): Sequelize {
	sequelizeConnection = new Sequelize ({
		dialect: 'mysql',
		host: 'localhost',
		port: 3300,
		username: 'root',
		password: '123456',
		database: 'dev'
	});

	return sequelizeConnection;
}

export async function init(): Promise<void> {
	const connection = sequelizeConnection ? sequelizeConnection : connect();

	Models.discoverModels(connection);

	// This is crucial to setup db, ensuring a new table is created 
	// if one hasnt existed, while keeping others untouched. 
	await connection.sync();
}