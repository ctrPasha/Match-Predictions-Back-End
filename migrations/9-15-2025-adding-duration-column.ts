import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export async function up({ context: queryInterface }: { context: QueryInterface }) {
	await queryInterface.addColumn('matches', 'duration', {
		type: DataTypes.STRING,
		allowNull: true
	});
}