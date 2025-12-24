import { QueryInterface, Sequelize, DataTypes } from "sequelize";

export async function up({ context: queryInterface }: { context: QueryInterface }) { 
	console.log('Adding founded column to DB');

	const exists = await queryInterface.describeTable('teams');

	if (!exists) {
		await queryInterface.addColumn('teams', 'founded', {
			type: DataTypes.INTEGER,
			allowNull: true
		});

		await queryInterface.changeColumn('teams', 'founded', {
			type: DataTypes.INTEGER,
			allowNull: false
		});
	}
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
	await queryInterface.removeColumn('teams', 'founded');
}