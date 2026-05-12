import * as MatchDataController from '../controllers/matchdata';
import { MatchPrediction } from '../interfaces/predictions/goals';
import * as PredictGoals from '../prediction/goals';

export async function fetchAndCalculatePredictions(
    competitonCode: string,
    homeTeamPublicId: string,
    awayTeamPublicId: string
) {
    let matches = await MatchDataController.getMatchByLeague(competitonCode);

    const finishedMatches = matches.filter(
        m => m.status === 'FINISHED' && m.fullTimeHome !== null && m.fullTimeAway !== null
    ) as unknown as MatchPrediction[];

    return PredictGoals.predictExpectedGoals(finishedMatches, homeTeamPublicId, awayTeamPublicId);
}
