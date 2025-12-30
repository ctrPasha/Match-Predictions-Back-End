import * as MatchDataController from '../controllers/matchdata';
import * as PredictGoals from '../prediction/goals';

export async function fetchAndCalculatePredictions(competitonCode: string, homeTeamPublicId: string, awayTeamPublicId: string) {
	let matches = await MatchDataController.getMatchByLeague(competitonCode);

	return PredictGoals.predictExpectedGoals(matches, homeTeamPublicId, awayTeamPublicId);	
}