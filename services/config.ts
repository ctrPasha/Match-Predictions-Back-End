// Read the config.json file and return it as an object, create an interface and teh return type will be <interface>
// Read the interfaces file and return that config
import { Config } from '../interfaces/config';
import fs from 'fs/promises';
import path from 'path';

export async function getConfig(): Promise<Config> {
    const configPath = path.join(__dirname, '../config.json');

    try {
        const readData = await fs.readFile(configPath, 'utf-8');
        const parseData = JSON.parse(readData);
        const returnVal = { apiKey: parseData.API_KEY };
        return returnVal;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
