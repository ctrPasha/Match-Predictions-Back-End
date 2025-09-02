import * as CrestDownloaderService from '../services/crestDownloader';
import args from 'args';

import { SEASON_COMPETITIONS } from '../season_competitions.config';

args.option('competition', 'Code for the competition, e.g.: PL');
args.option('season', 'Season for which we want to fetch data for for the given competition');
args.option('fetch-all', 'Fetches data from multiple seasons and competitions');

const options = args.parse(process.argv);

async function main(): Promise<void> {
    await parseOptions();
}

async function parseOptions(): Promise<void> {
    if (options.fetchAll) {
        await fetchTeamsAndSeasons();
    }

    if (options.competition && options.season) {
        await fetchTeamAndSeason();
    }
}

async function fetchTeamAndSeason(): Promise<void> {
    const competition = options.competition;
    const season = options.season;

    if (!competition || !season) {
        throw new Error('Must provide competition and season!');
    }

    await CrestDownloaderService.fetchTeams(competition, season);
    console.log('Fetched and saved to db!');
}

async function fetchTeamsAndSeasons(): Promise<void> {
    let counter = 0;
    const sleep = async () => new Promise(resolve => setTimeout(resolve, 60000));

    for (const seasons of SEASON_COMPETITIONS) {
        for (const compCode of seasons.competitions) {
            counter += 1;

            if (counter >= 10) {
                console.log('Reached limit per minute. Sleeping for 1 minute');
                await sleep();
                counter = 0;
            }

            await CrestDownloaderService.fetchTeams(compCode, seasons.season, `assets/${compCode}/${seasons.season}`);
        }
    }
    console.log('Downloaded all crests to the Assets folder!');
}

main();
