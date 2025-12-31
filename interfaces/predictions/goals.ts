export interface MatchPrediction {
	homeTeamPublicId: string;
	awayTeamPublicId: string;
	fullTimeHome: number;
	fullTimeAway: number;
}
// Note to self Prediction Result should change later on 
export interface PredictionResult {
	homePublicId: string;
	awayPublicId: string;

	// expected goals(xG) (H)ome/(A)way
	xGHome: number
	xGAway: number
}

export interface MostProbableScoreLine {
	likelyScoreHome: number;
	likelyScoreAway: number;
}