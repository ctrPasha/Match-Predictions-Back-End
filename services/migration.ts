// Create umzug an create up and down functionality
import * as Connect from './database';
import * as path from 'path';

import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize, QueryInterface } from 'sequelize';

export function createUmzug(sequelize: Sequelize): Umzug<QueryInterface> {
    const migrationsDir = path.join(__dirname, '../migrations').replace(/\\/g, '/');
    const migrationGlob = migrationsDir.endsWith('/') ? migrationsDir + '*.ts' : migrationsDir + '/*.ts';

    return new Umzug({
        migrations: {
            glob: migrationGlob
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console
    });
}

export async function migrateUp(): Promise<void> {
    try {
        const connection = Connect.connect();
        const umzug = createUmzug(connection);
        const migrations = await umzug.up();

        migrations.forEach((migration: any) => {
            console.info(`${migration.name} migrated up`);
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function migrateDown(): Promise<void> {
    try {
        const connection = Connect.connect();
        const umzug = createUmzug(connection);
        const migrations = await umzug.down();

        migrations.forEach((migration: any) => {
            console.info(`${migration.name} migrated down`);
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}
