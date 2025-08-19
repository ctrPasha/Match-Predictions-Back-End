// Bunch of functions related to that api, fetcing matches, leagues, seasons etc 
import * as RequestService from './request';
import * as MatchesConverterService from './converter/match'
import * as TeamsConverterService from './converter/team'
import * as TeamDataController from '../controllers/teamdata';

import { TeamModelInterface } from '../interfaces/models/teamodel';
import { Teams } from '../interfaces/footballdata/teams';

const BASE_URL = 'http://api.football-data.org/v4/';

const COMPETITION_CODES = ['PL', 'PD', 'BL1', 'FL1', 'DED', 'SA', 'PPL', 'CL'];

export const SEASON_COMPETITIONS = [
    {
        season: '2023',
        competitions: ['PL', 'PD', 'BL1', 'CL', 'FL1', 'DED', 'SA', 'PPL']
    },
    {
        season: '2024',
        competitions: ['PL', 'PD', 'BL1', 'CL', 'FL1', 'DED', 'SA', 'PPL']
    },
    {
        season: '2025',
        competitions: ['PL', 'PD', 'BL1', 'CL', 'FL1', 'DED', 'SA', 'PPL']
    },
];

export async function fetchAndSaveMatches(competitionCode: string, season: string): Promise<void> {

	let endpoint = `${BASE_URL}competitions/${competitionCode}/matches`

	if (season) {
		endpoint += `?season=${season}`;
	}

	// Make a call to the request service, it will return any
	const res = await RequestService.get(endpoint);
	// parse service
	const transformedMatches = MatchesConverterService.transformToMatches(res)

	const matchesToCreate: any[] = [];

	for (const transformedMatch of transformedMatches) {
		//const exists = await;
	}
	console.log("Transformed Matches: ", JSON.stringify(transformedMatches, null, 4));
}

export async function fetchAndSaveTeams(competitionCode: string, season: string): Promise <void> {
	validateCompetitionCode(competitionCode);

	let endpoint = `${BASE_URL}competitions/${competitionCode}/teams`;

	if (season) {
		endpoint += `?season=${season}`;
	}

	const res = await RequestService.get(endpoint)

	const transformedTeams = TeamsConverterService.transformTeam(res);
	const teamsToCreate: any[] = [];

	for (const transformedTeam of transformedTeams) {
		const exists = await TeamDataController.getUniqueTeam(
			transformedTeam.team.name,
			transformedTeam.season.year

		);

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
				venue: transformedTeam.team.venue ?? null
			});
		}
	}

	await TeamDataController.bulkCreate(teamsToCreate);
}

function validateCompetitionCode(competitionCode: string): void {
	if (!COMPETITION_CODES.includes(competitionCode)) {
		throw new Error(`Invalid competition code provided: ${competitionCode}`);
	}
}