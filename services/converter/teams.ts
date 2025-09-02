import { MatchTeam } from "../../interfaces/footballdata/team";
import { Team } from "../../interfaces/footballdata/team";
import { parseCoach } from "./coach";

export function parseMatchTeam(res: any): MatchTeam {
	return {
		name: res.name,
		shortName: res.shortName,
		tla: res.tla,
	};
}

export function parseTeam(res: any): Team {
	return {
		name: res.name,
		shortName: res.shortName,
		tla: res.tla,
		crest: res.crest,
		clubColors: res.clubColors,
		coach: parseCoach(res.coach),
		venue: res.venue,
		founded: res.founded
	};
}

export function transformTeam(res: any) {
	throw new Error('Function not implemented.');
}
