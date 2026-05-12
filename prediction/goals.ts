import { time } from 'console';
import { MatchPrediction, PredictionResult, MostProbableScoreLine } from '../interfaces/predictions/goals';

/********************************************************************************************
	NOTE:
		im substituting some of the values like lambda and mu with my own name conventions
		lambda = xGHome
		mu = xGAway

		so to build the probability matrix we use the equation 
		P(x, y) = tao_lamba, mu(x,y) * possion(xGHome, i) * poisson(xGAway, j)

*********************************************************************************************/

// RHO constant, from doing research, most numbers tend to be between -0.10 and -0.13
// Though as I get more data, I will calculate rho my self accoridng to the Cole Dixon module
const RHO = -0.13;

/******************************************************************************************************
	Note: 
		According to dixon coles, the time decay constant is usually between 0.0065 and 0.01, 
		But their module uses half week, wheras I will be using normal days,
		This means that the constant will be about 0.0018 since im using days.
*******************************************************************************************************/
const XI = 0.0065 / 3.5;
const MAX_GOALS = 10;

// the module used to predict the final scores of the two teams
export function predictExpectedGoals(
    matches: MatchPrediction[],
    homePublicId: string,
    awayPublicId: string
): PredictionResult {
    // Grab all games for that specific home team
    let teamHomeGames = matches.filter(match => {
        return match.homeTeamPublicId === homePublicId;
    });

    // Grab all the games for the specific away team
    let teamAwayGames = matches.filter(match => {
        return match.awayTeamPublicId === awayPublicId;
    });

    if (teamHomeGames.length === 0 || teamAwayGames.length === 0 || matches.length === 0) {
        throw new Error('Array is empty, cannot gather data');
    }

    const leagueWeight = matches.map(match => timeDecay(XI, calculateDaysSinceMatch(match.matchDate)));
    let leagueAvgGoalsHome = weightedAvg(
        matches.map(match => match.fullTimeHome),
        leagueWeight
    );
	
    let leagueAvgGoalsAway = weightedAvg(
        matches.map(match => match.fullTimeAway),
        leagueWeight
    );

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

    console.log({ homeAttack, awayAttack, homeDefense, awayDefense });
    console.log({ xGHome, xGAway });

    let probabilityMatrix = createProbabilityMatrix(xGHome, xGAway);

    let highestProbabilityScoreline = predictMostProbableScore(probabilityMatrix);

    return {
        homePublicId,
        awayPublicId,
        probability: highestProbabilityScoreline
    };
}

/**********************************************************************************
    Home attack strength = The teams avg home goals/ league avg home goals
	away attack strength = the aways team avg goals scored away / league avg away
	home defense = home teams goals conceded/ league average at home conceded
	away defense = the teams away goals conceded / league average away conceded 
***********************************************************************************/
function getPredictedGoals(matchPredictions: MatchPrediction[], leagueAvgGoals: number, homeMatch: boolean): number {
    const goals = matchPredictions.map(match => {
        return homeMatch ? match.fullTimeHome : match.fullTimeAway;
    });

    const weights = matchPredictions.map(match => timeDecay(XI, calculateDaysSinceMatch(match.matchDate)));

    return weightedAvg(goals, weights) / leagueAvgGoals;
}

// Function for calculating an average, since im a noobie, had to grab the source code from reddit
function avg(num: number[]): number {
    if (num.length === 0) {
        throw new Error('Cant calculate an empty data set');
    }
    return num.reduce((acc, v) => acc + v, 0) / num.length;
}

// calculates tao, which controls the strength of the correlation that is used for the 	probability matrix
// it is used for low scoring games such as 1-0, 0-1, 1-1, 0-0
// https://www.ajbuckeconbikesail.net/wkpapers/Airports/MVPoisson/soccer_betting.pdf module 4.2
function probabilityShift(x: number, y: number, xGHome: number, xGaway: number, rho: number): number {
    if (x === 0 && y == 0) {
        return 1 - xGHome * xGaway * rho;
    } else if (x === 0 && y === 1) {
        return 1 + xGHome * rho;
    } else if (x === 1 && y === 0) {
        return 1 + xGaway * rho;
    } else if (x === 1 && y === 1) {
        return 1 - rho;
    }
    return 1;
}

// https://dashee87.github.io/football/python/predicting-football-results-with-statistical-modelling-dixon-coles-and-time-weighting/
// builds the probability matrix
function createProbabilityMatrix(xGHome: number, XGAway: number): number[][] {
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
        probabilityMatrix[i] = [];
        for (let j = 0; j <= MAX_GOALS; j++) {
            probabilityMatrix[i][j] = x[i] * y[j] * probabilityShift(i, j, xGHome, XGAway, RHO);
        }
    }
    console.log(probabilityMatrix);
    return probabilityMatrix;
}

// Predicts the most probable score with the highest probability using the probability matrix.
function predictMostProbableScore(probabilityMatrix: number[][]): MostProbableScoreLine {
    let likelyScoreHome: number = 0;
    let likelyScoreAway: number = 0;
    let probability: number = 0;

    if (probabilityMatrix.length === 0) {
        throw new Error('Probability matrix is empty!');
    }

    for (let i = 0; i <= MAX_GOALS; i++) {
        for (let j = 0; j <= MAX_GOALS; j++) {
            if (probabilityMatrix[i][j] > probability) {
                probability = probabilityMatrix[i][j];
                likelyScoreHome = i;
                likelyScoreAway = j;
            }
        }
    }

    // Rounds the highest probable score to a percentage which will then be displayed in the front-end
    probability = Math.round(probability * 100);
    return {
        likelyScoreHome,
        likelyScoreAway,
        probability
    };
}

function predictWinner(probabilityMatrix: number[][]): number {
    return 0;
}

// Poisson mass probability function
// http://geeksforgeeks.org/maths/poisson-distribution/
function poissonDistribution(xG: number, x: number): number {
    return (Math.pow(xG, x) * Math.exp(-xG)) / factorial(x);
}

function factorial(num: number): number {
    if (num <= 1) {
        return 1;
    }

    let res = 1;

    for (let i = 1; i <= num; i++) {
        res *= i;
    }

    return res;
}

function timeDecay(xi: number, daysSinceMatch: number): number {
    return Math.exp(-xi * daysSinceMatch);
}

function weightedAvg(vals: number[], weights: number[]): number {
    let weightedSum = 0;
    let weightTotal = 0;

    for (let i = 0; i < vals.length; i++) {
        // Multiply each value by its weight, and add it to the weighted sum
        weightedSum += vals[i] * weights[i];
        // Sum up the total weight
        weightTotal += weights[i];
    }

    // Divide the weighted sum by the total weight to get the weighted average
    return weightedSum / weightTotal;
}

// Src: https://www.geeksforgeeks.org/javascript/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
function calculateDaysSinceMatch(matchDate: string): number {
    const currDate = new Date();
    const matchDay = new Date(matchDate);

    const timeDiff = currDate.getTime() - matchDay.getTime();

    const daysDiff = timeDiff / (1000 * 3600 * 24);

    return daysDiff;
}

/*
	TODO:
		Figure out a way to on how to implement a teams current form into the predictions
		so for example historical data can have a certain weight on the final outcome of the prediction
		while the recent data has a different weight, and adjust to get the most accurate rating
		somethign similar to what 537 score predictions did. 

	TODO2: 
		Build the function that grabs the probability matrix, and calculates the most probable scoreline, and returns that scoreline
		call this in the main function and you get the most accurate prediction
*/
