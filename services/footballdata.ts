// Bunch of functions related to that api, fetcing matches, leagues, seasons etc
import * as RequestService from './request';
import * as MatchesConverterService from './converter/match';
import * as TeamsConverterService from './converter/team';
import * as TeamDataController from '../controllers/teamdata';
import * as MatchDataController from '../controllers/matchdata';

import { v4 as uuidv4 } from 'uuid';

export const BASE_URL = 'http://api.football-data.org/v4/';

const COMPETITION_CODES = ['PL', 'PD', 'BL1', 'FL1', 'DED', 'SA', 'PPL', 'CL'];

export async function fetchAndSaveMatches(competitionCode: string, season: string): Promise<void> {
    let endpoint = `${BASE_URL}competitions/${competitionCode}/matches`;

    if (season) {
        endpoint += `?season=${season}`;
    }

    // Make a call to the request service, it will return any
    const res = await RequestService.get(endpoint);
    // parse service
    const transformedMatches = MatchesConverterService.transformToMatches(res);

    const matchesToCreate: any[] = [];

    for (const transformedMatch of transformedMatches) {
        const exists = await MatchDataController.getUniqueMatch(
            transformedMatch.homeTeam.shortName,
            transformedMatch.awayTeam.shortName,
            transformedMatch.season.year,
            transformedMatch.id
        );
        
        const homeTeam = await TeamDataController.getTeamByNameAndArea(
            transformedMatch.homeTeam.shortName,
            transformedMatch.area.code
        );
        const awayTeam = await TeamDataController.getTeamByNameAndArea(
            transformedMatch.awayTeam.shortName,
            transformedMatch.area.code
        );

        if (!exists) {
            matchesToCreate.push({
                areaName: transformedMatch.area.name,
                areaCode: transformedMatch.area.code,
                competitionCode: transformedMatch.competition.code,
                competitionType: transformedMatch.competition.type,
                seasonYear: transformedMatch.season.year,
                homeTeamName: transformedMatch.homeTeam.shortName,
                awayTeamName: transformedMatch.awayTeam.shortName,
                scoreWinner: transformedMatch.score.winner ?? null,
                scoreDuration: transformedMatch.score.duration,
                fullTimeHome: transformedMatch.score.fullTime.home,
                fullTimeAway: transformedMatch.score.fullTime.away,
                halfTimeHome: transformedMatch.score.halfTime.home,
                halfTimeAway: transformedMatch.score.halfTime.away,
                match_id: transformedMatch.id,
                matchDate: transformedMatch.matchDate,
                homeTeamPublicId: homeTeam ? homeTeam.publicId : uuidv4(),
                awayTeamPublicId: awayTeam ? awayTeam.publicId : uuidv4()
            });
        }
    }
    await MatchDataController.bulkCreate(matchesToCreate);
}

export async function fetchAndSaveTeams(competitionCode: string, season: string): Promise<void> {
    validateCompetitionCode(competitionCode);

    let endpoint = `${BASE_URL}competitions/${competitionCode}/teams`;

    if (season) {
        endpoint += `?season=${season}`;
    }

    const res = await RequestService.get(endpoint);

    const transformedTeams = TeamsConverterService.transformTeam(res);
    const teamsToCreate: any[] = [];

    for (const transformedTeam of transformedTeams) {
        const exists = await TeamDataController.getUniqueTeam(
            transformedTeam.competition.code,
            transformedTeam.team.shortName,
            transformedTeam.season.year
        );

        const existingTeam = await TeamDataController.getTeamByNameAndArea(
            transformedTeam.team.shortName,
            transformedTeam.area.code
        );

        // 3. What i would do is to assign a public identifer to matches. So that you will have homeTeamPublicIdentifier
        // and away teamPublic identifier. This will make search way faster, as you can just pass the identifiers to find the matches.

        if (!exists) {
            teamsToCreate.push({
                competitionCode: transformedTeam.competition.code,
                competitionType: transformedTeam.competition.type,
                seasonYear: transformedTeam.season.year,
                areaName: transformedTeam.area.name,
                areaCode: transformedTeam.area.code,
                teamName: transformedTeam.team.name,
                shortName: transformedTeam.team.shortName,
                tla: transformedTeam.team.tla,
                clubColors: transformedTeam.team.clubColors ?? null,
                coachName: transformedTeam.team.coach?.name ?? null,
                venue: transformedTeam.team.venue ?? null,
                founded: transformedTeam.team.founded,
                publicId: existingTeam ? existingTeam.publicId : uuidv4()
            });
        }
    }
    //console.log("Transformed Teams:", JSON.stringify(transformedTeams, null, 2));
    console.log('Teams to insert:', teamsToCreate);
    await TeamDataController.bulkCreate(teamsToCreate);
}

function validateCompetitionCode(competitionCode: string): void {
    if (!COMPETITION_CODES.includes(competitionCode)) {
        throw new Error(`Invalid competition code provided: ${competitionCode}`);
    }
}
