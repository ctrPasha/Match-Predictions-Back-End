import * as DataBase from '../services/database'

import { Sequelize } from "sequelize";

process.env.NODE_ENV = 'test';
let connection: Sequelize;

before(async () => {
	connection = await DataBase.init();
	await truncateTables();
});

after(async () => {
	await connection.close();
})

async function truncateTables(): Promise<void> {
	const tables: string[] = [
		'matches',
		'teams'
	]
	let sql = 'SET FOREIGN_KEY_CHECKS=0';

	for (const table of tables) {
		sql += `TRUNCATE \`${table}\`;`;
	}

	sql += "SET FOREIGN_KEY_CHECKS=1";
	await connection.query(sql);
}
