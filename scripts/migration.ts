// Use args see if the argument that the user passed when the user called the script is up or down, 
// depending if up or down, call the approriate function in migration service, 
// in migration servie chave 3 rfunctions up or down, add script to package.json called db migrate

import args from 'args';
import * as MigrationService from '../services/migration'

/*
args.command('migrate', ' ', (name, sub, options) => {
	void migrate(options);
});*/

args.option('up', 'Migrated Up');
args.option('down', 'Migrated Down');

const options = args.parse(process.argv);

async function migrate() {
	console.log(options);

	if (options.up) {
		console.log('Running migration: UP');
    	await MigrationService.migrateUp();
	} else if (options.down) {
		console.log('Running migration: DOWN');
    	await MigrationService.migrateDown();
	} else {
		console.log('Please specify --up or --down');
	}
}

migrate().catch(console.error);

/*
async function up(): Promise<void> {
	console.log('uping')
	await MigrationService.migrateUp();
}

async function down(): Promise<void> {
	await MigrationService.migrateDown();
}

async function migrate(options: any): Promise<void> {
	console.log(options);

	if (options.up) {
		await up();
	} 

	if (options.down) {
		await down();
	}
}*/
