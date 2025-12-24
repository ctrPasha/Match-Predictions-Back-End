import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export async function up({ context: queryInterface }: { context: QueryInterface }) {
    console.log(
		'Adding Regular Time Home/Away, Extra Time Home/Away, and Penalties Home/Away columns to the DB!'
	);

	await queryInterface.addColumn('matches', 'regularTimeHome', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'regularTimeAway', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'extraTimeHome', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'extraTimeAway', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'penaltiesHome', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'penaltiesAway', {
		type: DataTypes.INTEGER,
		allowNull: true
	});
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
	await queryInterface.removeColumn('matches', 'regularTimeHome');
	await queryInterface.removeColumn('matches', 'regularTimeAway');
	await queryInterface.removeColumn('matches', 'extraTimeHome');
	await queryInterface.removeColumn('matches', 'extraTimeAway');
	await queryInterface.removeColumn('matches', 'penaltiesHome');
	await queryInterface.removeColumn('matches', 'penaltiesAway');
}