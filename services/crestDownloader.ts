import * as RequestService from './request';
import * as TeamsConverterService from './converter/team';

import fs from 'fs';
import path from 'path';

import { BASE_URL } from './footballdata';

async function downloadCrest(url: string, saveDir = 'assets') {
    if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
    }

    const fileName = path.basename(url);
    const filePath = path.join(saveDir, fileName);

    if (fs.existsSync(filePath)) {
        console.log(`${filePath} already exists!`);
        return;
    }

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch ${url}`);
        }

        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        console.log(`Saved crest: ${fileName}`);
    } catch (err) {
        console.log(err);
    }
}

export async function fetchTeams(competitionCode: string, season: string, saveDir?: string): Promise<void> {
    let endpoint = `${BASE_URL}competitions/${competitionCode}/teams`;

    if (season) {
        endpoint += `?season=${season}`;
    }

    // Make a call to the request service, it will return any
    const res = await RequestService.get(endpoint);

    const transformedTeams = TeamsConverterService.transformTeam(res);
    //console.log(JSON.stringify(transformedTeams, null, 2));

    const directory = saveDir ?? path.join('assets', competitionCode, season);

    for (const transofrmTeam of transformedTeams) {
        console.log(`Team: ${transofrmTeam.team.name}, Crest: ${transofrmTeam.team.crest}`);
        if (transofrmTeam.team.crest) {
            await downloadCrest(transofrmTeam.team.crest, directory);
        }
    }
}
