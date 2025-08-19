import * as AreaConverterServicre from './area';
import * as TeamsConverterService from './teams';
import * as SeasonConverterService from './seasons';
import * as CompetitionConverterService from './competition';

import { Teams } from '../../interfaces/footballdata/teams';

export function transformTeam(res: any): Teams[] {
	let teams: Teams[] = [];

	for (const team of res.teams) {
		teams.push({
			competition: CompetitionConverterService.parseCompetiton(res.competition),
			season: SeasonConverterService.parseSeason(res.season),
			area: AreaConverterServicre.parseArea(team.area),
			team: TeamsConverterService.parseTeam(team),
		});
	}
	return teams;
}