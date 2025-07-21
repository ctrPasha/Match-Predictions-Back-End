import { QueryInterface, Sequelize, DataTypes } from "sequelize";

export async function up({ context: queryInterface }: { context: QueryInterface }) {
	console.log('Adding name column to counters table...');
	await queryInterface.addColumn('counters', 'username',	{
		type: DataTypes.STRING,
	}); 
}

// Remove a column 
export async function down({ context: queryInterface }: { context: QueryInterface }) {
	await queryInterface.removeColumn('counters', 'username');
};