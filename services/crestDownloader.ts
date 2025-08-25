import * as RequestService from './request';
import * as TeamsConverterService from './converter/team';

import fs from 'fs';
import path from 'path';

import { BASE_URL } from './footballdata';

async function downloadCrest(url: string, teamName: string, saveDir = 'assets') {
    if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
    }

    const parseName = teamName.replace(/[^a-z0-9]/gi, '_');
    const extension = path.extname(url);
    const fileName = `${parseName}${extension}`;
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

    const directory = saveDir ?? path.join('assets', competitionCode, season);

    for (const transformTeam of transformedTeams) {
        console.log(`Team: ${transformTeam.team.name}, Crest: ${transformTeam.team.crest}`);
        if (transformTeam.team.crest) {
            await downloadCrest(transformTeam.team.crest, transformTeam.team.name, directory);
        }
    }
}
