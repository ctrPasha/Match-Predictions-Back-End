import * as AreaConverterServicre from "./area";
import * as CompetitionConverterService from "./competition";
import * as SeasonConverterService from "./seasons";
import * as TeamsConverterService from "./teams";
import * as ScoreConverterService from "./score";

import { Match } from ".../../../interfaces/footballdata/match";

export function transformToMatches(res: any): Match[] {
    let matches: Match[] = [];
    for (const match of res.matches) {
        matches.push({
            area: AreaConverterServicre.parseArea(match.area),
            competition: CompetitionConverterService.parseCompetiton(
                match.competition
            ),
            season: SeasonConverterService.parseSeason(match.season),
            homeTeam: TeamsConverterService.parseMatchTeam(match.homeTeam),
            awayTeam: TeamsConverterService.parseMatchTeam(match.awayTeam),
            score: ScoreConverterService.parseScore(
                match.score,
                match.homeTeam.name,
                match.awayTeam.name
            ),
        });
    }
    return matches;
}
