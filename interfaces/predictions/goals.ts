export interface MatchPrediction {
	homeTeamPublicId: string;
	awayTeamPublicId: string;
	fullTimeHome: number;
	fullTimeAway: number;
}

export interface PredictionResult {
	homePublicId: string;
	awayPublicId: string;

	// expected goals(xG) (H)ome/(A)way
	xGHome: number
	xGAway: number
}