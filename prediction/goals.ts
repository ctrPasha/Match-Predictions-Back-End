import { MAX } from 'uuid';
import { MatchPrediction, PredictionResult,  } from '../interfaces/predictions/goals';


// RHO constant, from doing research, most numbers tend to be between -0.10 and -0.13
// Though as I get more data, I will calculate rho my self accoridng to the Cole Dixon module
const RHO = -0.13;
const MAX_GOALS = 10;

// the module used to predict the final scores of the two teams 
export function predictExpectedGoals(matches: MatchPrediction[], homePublicId: string, awayPublicId: string): PredictionResult {
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
// calculates tao, which controls the strength of the correlation that is used for the 	probability matrix
// it is used for low scoring games such as 1-0, 0-1, 1-1, 0-0	
// https://www.ajbuckeconbikesail.net/wkpapers/Airports/MVPoisson/soccer_betting.pdf module 4.2
function probabilityShift(x: number, y: number, xGHome: number, xGaway: number, rho: number): number {
	if (x === 0 && y == 0) {
		return (1 - (xGHome * xGaway * rho));
 	} else if (x === 0 && y === 1) {
		return (1 + (xGHome * rho));
	} else if (x === 1 && y === 0) {
		return (1 + (xGaway * rho));
	} else if (x === 1 && y === 1) {
		return 1 - rho;
	}
	return 1;
}

// https://dashee87.github.io/football/python/predicting-football-results-with-statistical-modelling-dixon-coles-and-time-weighting/
// builds the probability matrix 
function createProbabilityMatrix(xGHome: number, XGAway: number, rho: number): number[][] {
	const probabilityMatrix: number[][] = [];
	const x: number[] = [];
	const y: number[] = [];

	// fill in the arrays with probabilities to then build the matrix 
	for (let i = 0; i <= MAX_GOALS; i++) {
		x[i] = poissonDistribution(xGHome, i);
		y[i] = poissonDistribution(XGAway, i);
	}

	// building the matrix
	for (let i = 0; i <= MAX_GOALS; i++) {
		for (let j = 0; j <= MAX_GOALS; j++) {
			probabilityMatrix[i][j] = x[i] * y[j] * probabilityShift(i, j, xGHome, XGAway, RHO);
		}
	}
	return probabilityMatrix;
}

// Poisson probability mass function 
// http://geeksforgeeks.org/maths/poisson-distribution/
function poissonDistribution(xG: number, x: number): number {
	return (Math.pow(xG, x)  * Math.exp(-xG)) / factorial(x);
}

function factorial(num: number): number {
	if (num <= 1) {
		return 1;
	}

	let res = 1;

	for (let i = 1; i <= num; i++) {
		res *= i 
	}

	return res;
}

/*
	TODO:
		Figure out a way to on how to implement a teams current form into the predictions
		so for example historical data can have a certain weight on the final outcome of the prediction
		while the recent data has a different weight, and adjust to get the most accurate rating
		somethign similar to what 537 score predictions did. 

	TODO2: 
		Build the function that grabs the probability matrix, and calculates the most probable
		call this in the main function and you get the most accurate prediction
*/
