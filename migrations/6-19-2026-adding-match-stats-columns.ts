import { QueryInterface, Sequelize, DataTypes } from "sequelize";

export async function up({ context: queryInterface }: { context: QueryInterface }) {
	console.log('Adding match stats columns to matches table...');
	await queryInterface.addColumn('matches', 'homeShots', {
		type: DataTypes.INTEGER,
		allowNull: true
	});
	await queryInterface.addColumn('matches', 'awayShots', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'homeShotsOnTarget', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'awayShotsOnTarget', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'homeCorners', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'awayCorners', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'homeFouls', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'awayFouls', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'homeYellowCards', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'awayYellowCards', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'homeRedCards', {
		type: DataTypes.INTEGER,
		allowNull: true
	});

	await queryInterface.addColumn('matches', 'awayRedCards', {
		type: DataTypes.INTEGER,
		allowNull: true
	});
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
	await queryInterface.removeColumn('matches', 'homeShots');
	await queryInterface.removeColumn('matches', 'awayShots');
	await queryInterface.removeColumn('matches', 'homeShotsOnTarget');
	await queryInterface.removeColumn('matches', 'awayShotsOnTarget');
	await queryInterface.removeColumn('matches', 'homeCorners');
	await queryInterface.removeColumn('matches', 'awayCorners');
	await queryInterface.removeColumn('matches', 'homeFouls');
	await queryInterface.removeColumn('matches', 'awayFouls');
	await queryInterface.removeColumn('matches', 'homeYellowCards');
	await queryInterface.removeColumn('matches', 'awayYellowCards');
	await queryInterface.removeColumn('matches', 'homeRedCards');
	await queryInterface.removeColumn('matches', 'awayRedCards');
}