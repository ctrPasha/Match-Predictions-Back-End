import { MatchPrediction } from '../interfaces/predictions/goals';

/*
	TODO:
		Figure out a way to implement 
*/

// the module used to predict the final scores of the two teams 
export function predictGoals(matches: MatchPrediction[], homePublicId: string, awayPublicId: string) {
	// Grab all games for that specific home team
	let teamHomeGames = matches.filter((match) => {
		return match.homeTeamPublicId === homePublicId;
	});

	// Grab all the games for the specific away team
	let teamAwayGames = matches.filter((match) => {
		return match.awayTeamPublicId === awayPublicId;
	})

	// Calculating league averages 
	let leagueAvgGoalsHome = avg(matches.map((match) => match.fullTimeHome));
	let leagueAvgGoalsAway = avg(matches.map((match) => match.fullTimeAway));

	// Calculating attack strengths for each team
	let homeAttack = predictHomeAttack(teamHomeGames, leagueAvgGoalsHome);
	let awayAttack = predictAwayAttack(teamAwayGames, leagueAvgGoalsAway);

	// Calculating defense strengths for each team
	let homeDefense = predictHomeDefense(teamHomeGames, leagueAvgGoalsAway);
	let awayDefense = predictAwayDefense(teamAwayGames, leagueAvgGoalsHome);

	// according to the poisson module: https://www.statsandsnakeoil.com/2018/06/22/dixon-coles-and-xg-together-at-last/
	// xGHome = Attack strength of home team * defense strength of away team * league average goals scored home
	// xGAway = Attack strength of away team * defense strength of home team * league average goals scored away
	let xGHome = homeAttack * awayDefense * leagueAvgGoalsHome;
	let xGAway = awayAttack * homeDefense * leagueAvgGoalsAway;
	
	return {
		xGHome,
		xGAway
	}
}

// Home attack strength = The teams avg home goals/ league avg home goals
function predictHomeAttack(homeMatches: MatchPrediction[], leagueAvgGoalsHome: number) {
	let avgGoalsHome = avg(homeMatches.map((matches) => {
		return matches.fullTimeHome;
	}));
	return avgGoalsHome / leagueAvgGoalsHome;
}

// away attack strength = the aways team avg goals scored away / league avg away
function predictAwayAttack(awayMatches:MatchPrediction[], leagueAvgGoalsAway: number) {
	let avgGoalsAway = avg(awayMatches.map((matches) => {
		return matches.fullTimeAway;
	}));
	return avgGoalsAway / leagueAvgGoalsAway;
}

// home defense = home teams goals conceded/ league average at home conceded
function predictHomeDefense(homeMatches: MatchPrediction[], leagueAvgConcededHome: number) {
	let homeDefense = avg(homeMatches.map((matches) => {
		return matches.fullTimeAway;
	}))
	return homeDefense / leagueAvgConcededHome;
}

// away defense = the teams away goals conceded / league average away conceded 
function predictAwayDefense(awayMatches: MatchPrediction[], leagueAvgConcededAway: number) {
	let awayDefense = avg(awayMatches.map((matches) => {
		return matches.fullTimeHome;
	}))
	return awayDefense / leagueAvgConcededAway;
}

// Function for calculating an average, since im a noobie, had to grab the source code from reddit
function avg(num: number[]): number {
	return num.reduce((acc, v) => acc + v, 0) / num.length;
}