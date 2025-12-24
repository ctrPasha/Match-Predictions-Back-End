import { Area } from "./area";
import { Competition } from "./competition";
import { Score } from "./score";
import { Season } from "./season";
import { MatchTeam } from "./team";


export interface Match {
	area: Area;
	competition: Competition;
	season: Season;
	id: number;
	status: string;
	matchDate: string;
	homeTeam: MatchTeam;
	awayTeam: MatchTeam;
	score: Score;
}