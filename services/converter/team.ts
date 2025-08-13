import * as AreaConverterServicre from './area';
import * as TeamsConverterService from './teams';

import { Teams } from '../../interfaces/footballdata/teams';

export function transformTeam(res: any): Teams[] {
	let teams: Teams[] = [];

	for (const team of res.teams) {
		teams.push({
			area: AreaConverterServicre.parseArea(team.area),
			team: TeamsConverterService.parseTeam(team),
		});
	}
	return teams;
}