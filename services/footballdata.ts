// Bunch of functions related to that api, fetcing matches, leagues, seasons etc 
import * as RequestService from './request';
import * as MatchesConverterService from './converter/match'
import * as TeamsConverterService from './converter/team'

const BASE_URL = 'http://api.football-data.org/v4/';

export async function getMatches(league: string, season: string): Promise<void> {
	// 1. Read the config to get the api
	// 2. Probably want to create a function in the RequestService to setHeaders(X-AUTH...) before making any calls
	// 3. Setup the url with all the params
	// 4. Call RequestService get/post with the url
	// 5. Create a transform function, maybe in a separate service (something like a TransformerService)
	// it will take a response that you will get here and transform into an object that you can use intenrally if 
	// you need. So you will need to have an interface defined for it.

	let endpoint = `${BASE_URL}competitions/${league}/matches`

	if (season) {
		endpoint += `?season=${season}`;
	}

	// Make a call to the request service, it will return any
	const res = await RequestService.get(endpoint);
	//console.log(res);
	// parse service
	const transformedMatches = MatchesConverterService.transformToMatches(res)
	console.log("Transformed Matches: ", JSON.stringify(transformedMatches, null, 4));
}

export async function getTeams(league: string, season: string): Promise <void> {
	let endpoint = `${BASE_URL}competitions/${league}/teams`

	if (season) {
		endpoint += `?season=${season}`;
	}
	const res = await RequestService.get(endpoint)

	const transformedTeams = TeamsConverterService.transformTeam(res);
	console.log("Transformed Matches: ", JSON.stringify(transformedTeams, null, 4));
}

// in Transformer:
// wil return array of matches
/*
export function transformToMatches(res: any): Match[] {
	const resObj = JSON.parse(res);

	let matches: Match[] = [];
	for (const match of resObj.matches) {
		matches.push({
			area: parseArea(match.area)
		})
	}
}

function parseArea(res: any): Area {
	return {
		name: res.name
	}
}*/

getMatches("PL", "2024")
//getTeams("PL", "2025")