import { MatchPrediction, PredictionResult,  } from '../interfaces/predictions/goals';

/*
	TODO:
		Figure out a way to on how to implement a teams current form into the predictions
		so for example historical data can have a certain weight on the final outcome of the prediction
		while the recent data has a different weight, and adjust to get the most accurate rating
		somethign similar to what 537 score predictions did. 
*/

// the module used to predict the final scores of the two teams 
export function predictGoals(matches: MatchPrediction[], homePublicId: string, awayPublicId: string): PredictionResult {
	// Grab all games for that specific home team
	let teamHomeGames = matches.filter((match) => {
		return match.homeTeamPublicId === homePublicId;
	});

	// Grab all the games for the specific away team
	let teamAwayGames = matches.filter((match) => {
		return match.awayTeamPublicId === awayPublicId;
	})

	if (teamHomeGames.length === 0 || teamAwayGames.length === 0 || matches.length === 0) {
		throw new Error("Array is empty, cannot gather data");
	}

	// Calculating league averages 
	let leagueAvgGoalsHome = avg(matches.map((match) => match.fullTimeHome));
	let leagueAvgGoalsAway = avg(matches.map((match) => match.fullTimeAway));

	// Calculating attack strengths for each team
	let homeAttack = getPredictedGoals(teamHomeGames, leagueAvgGoalsHome, true);
	let awayAttack = getPredictedGoals(teamAwayGames, leagueAvgGoalsAway, false);

	// Calculating defense strengths for each team
	let homeDefense = getPredictedGoals(teamHomeGames, leagueAvgGoalsAway, false);
	let awayDefense = getPredictedGoals(teamAwayGames, leagueAvgGoalsHome, true);

	// according to the poisson module: https://www.statsandsnakeoil.com/2018/06/22/dixon-coles-and-xg-together-at-last/
	// xGHome = Attack strength of home team * defense strength of away team * league average goals scored home
	// xGAway = Attack strength of away team * defense strength of home team * league average goals scored away
	let xGHome = homeAttack * awayDefense * leagueAvgGoalsHome;
	let xGAway = awayAttack * homeDefense * leagueAvgGoalsAway;

	return {
		homePublicId,
		awayPublicId,
		xGHome,
		xGAway
	}
}

/**********************************************************************************
    Home attack strength = The teams avg home goals/ league avg home goals
	away attack strength = the aways team avg goals scored away / league avg away
	home defense = home teams goals conceded/ league average at home conceded
	away defense = the teams away goals conceded / league average away conceded 
**********************************************************************************/ 
function getPredictedGoals(matchPredictions: MatchPrediction[], leagueAvgGoals: number, homeMatch: boolean): number {
	const games = matchPredictions.map(match => {
		return homeMatch ? match.fullTimeHome : match.fullTimeAway;
	})

	let avgGoals = avg(games);

	return avgGoals / leagueAvgGoals;
}

// Function for calculating an average, since im a noobie, had to grab the source code from reddit
function avg(num: number[]): number {
	if (num.length === 0) {
		throw new Error("Cant calculate an empty data set");
	}
	return num.reduce((acc, v) => acc + v, 0) / num.length;
}
// calculates rho, which controls the strength of the correlation that is used for the 	probability matrix
// it is used for low scoring games such as 1-0, 0-1, 1-1, 0-0	
function probabilityShift(x: number, y: number, xGHome: number, xGaway: number, rho: number): number {
	return 1;
}