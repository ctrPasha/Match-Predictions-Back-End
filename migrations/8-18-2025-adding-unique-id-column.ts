import { QueryInterface, Sequelize, DataTypes } from "sequelize";
//import { v4 as uuidv4 } from "uuid";

export async function up({ context: queryInterface }: { context: QueryInterface }) {
	console.log('Adding public_identifier column to teams table...');
	await queryInterface.addColumn('teams', 'public_identifier',	{
		type: DataTypes.STRING,
		allowNull: true,
	}); 

	await queryInterface.sequelize.query(`
    	UPDATE teams SET public_identifier = UUID();
  	`);

	await queryInterface.changeColumn('teams', 'public_identifier', {
		type: DataTypes.UUID,
		allowNull: false,
		unique: true,
  	});
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
	await queryInterface.removeColumn('teams', 'public_identifier');
};