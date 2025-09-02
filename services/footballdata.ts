// Bunch of functions related to that api, fetcing matches, leagues, seasons etc
import * as RequestService from './request';
import * as MatchesConverterService from './converter/match';
import * as TeamsConverterService from './converter/team';
import * as TeamDataController from '../controllers/teamdata';
import * as MatchDataController from '../controllers/matchdata';

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
            transformedMatch.homeTeam.name,
            transformedMatch.awayTeam.name,	
            transformedMatch.season.year,
            transformedMatch.id
        );

        if (!exists) {
            matchesToCreate.push({
                areaName: transformedMatch.area.name,
                areaCode: transformedMatch.area.code,
                competitionCode: transformedMatch.competition.code,
                competitionType: transformedMatch.competition.type,
                seasonYear: transformedMatch.season.year,
                homeTeamName: transformedMatch.homeTeam.name,
                awayTeamName: transformedMatch.awayTeam.name,
                scoreWinner: transformedMatch.score.winner,
                scoreDuration: transformedMatch.score.duration,
                fullTimeHome: transformedMatch.score.fullTime.home,
                fullTimeAway: transformedMatch.score.fullTime.away,
                halfTimeHome: transformedMatch.score.halfTime.home,
                halfTimeAway: transformedMatch.score.halfTime.away,
                match_id: transformedMatch.id,
				matchDate: transformedMatch.matchDate
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
        const exists = await TeamDataController.getUniqueTeam(transformedTeam.team.name, transformedTeam.season.year);

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
                founded: transformedTeam.team.founded
            });
        }
    }
    //console.log("Transformed Teams:", JSON.stringify(transformedTeams, null, 2));
    await TeamDataController.bulkCreate(teamsToCreate);
}

function validateCompetitionCode(competitionCode: string): void {
    if (!COMPETITION_CODES.includes(competitionCode)) {
        throw new Error(`Invalid competition code provided: ${competitionCode}`);
    }
}