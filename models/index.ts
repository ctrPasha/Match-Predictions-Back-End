import * as fs from 'fs';

import { Sequelize } from "sequelize";

export function discoverModels(sequelize: Sequelize): void {
	const modelFileNames = fs.readdirSync(__dirname);
	for (const modelFileName of modelFileNames) {
		if (modelFileName.startsWith('index')) {
			continue;
		}

		const model = require(`./${modelFileName}`);
		model.init(sequelize);
	}
}