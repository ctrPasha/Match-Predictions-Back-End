import * as Models from "../models/index"

import { Sequelize } from "sequelize";
import path from 'path';
import sequelize from "sequelize";

export function connect(): Sequelize {
	const sequelize = new Sequelize ({
		dialect: 'mysql',
		host: 'localhost',
		port: 3300,
		username: 'root',
		password: '12345',
		database: 'dev'
	});
	return sequelize;
}

export async function init(): Promise<void> {
	const connection = connect();

	Models.discoverModels(connection);

	// This is crucial to setup db, ensuring a new table is created 
	// if one hasnt existed, while keeping others untouched. 
	await connection.sync();
}