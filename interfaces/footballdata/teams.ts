import { Team } from "./team";
import { Area } from "./area";
import { Season } from "./season";
import { Competition } from "./competition";

export interface Teams {
	competition: Competition
	season: Season
	area: Area;
	team: Team;
}