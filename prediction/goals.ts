import { MatchPrediction } from '../interfaces/predictions/goals';

function predictGoals(matches: MatchPrediction[], homeTeamPublicId: string, awayTeamPublicId: string) {

}

// Home attack strength = The teams avg home goals/ league avg home goals
function predictHomeAttack(homeMatches: MatchPrediction[], avgGoalsHome: number) {}

// away attack strength = the aways team avg goals scored away / league avg away
function predictAwayAttack(awayMatches:MatchPrediction[], avgGoalsAway: number) {}

// home defense = home teams goals conceded/ league average at home conceded
function predictHomeDefense(homeMatches: MatchPrediction[], avgConcededHome: number) {}

// away defense = the teams away goals conceded/ league average away conceded 
function predictAwayDefense(awayMatches: MatchPrediction[], avgConcededAway: number) {}
