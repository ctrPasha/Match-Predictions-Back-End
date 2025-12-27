import * as MatchDataController from '../controllers/matchdata';
import * as GoalPredictionService from '../services/goalPrediction';
import { Router, Request, Response, NextFunction } from 'express';
import { BASE_URL } from './footballData';

export const router = Router();

// Gets upcoming fixtures and past results(scores) based off of the teams id
/* router.get('/:teamId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamIdentifier = req.params.teamId as string;
        //
        const fixtures = req.query.fixtures;
        // const results = req.query.results;

        const matches =
            fixtures != undefined
                ? await MatchDataController.getMatchFixtures(teamIdentifier)
                : await MatchDataController.getMatchResults(teamIdentifier);

        res.json({
            success: true,
            matches
        });
    } catch (err) {
        next(err);
    }
}); */

router.get('/:teamId/fixtures', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teamIdentifier = req.params.teamId as string;
		const upcomingMatches = await MatchDataController.getMatchFixtures(teamIdentifier);

		res.json({
			success: true,
			upcomingMatches
		});
	} catch(err) {
		next(err);
	}
});

router.get('/:teamId/fixtures/predictions/goals', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teamIdentifier = req.params.teamId as string;
		const upcomingMatches = await MatchDataController.getMatchFixtures(teamIdentifier);
		const competitionCode =  req.query.competitionCode as string;
		const homeId = req.query.homeId as string;
		const awayId = req.query.awayId as string;
		
		const predictionModel = await GoalPredictionService.fetchAndCalculatePredictions(competitionCode, homeId, awayId);
		console.log(predictionModel);
		res.json({
			success: true,
			upcomingMatches,
			predictionModel
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
});

/*
Fetfhes results based on the teamID and season year
FIX: Might need to only display without season year, and display all results + add a load more button on front end
initially displaying the 3 most recent matches, and then displaying the rest
*/
router.get('/:teamId/results', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teamIdentifier = req.params.teamId as string;
		const season = req.query.season as string;

		const results = await MatchDataController.getMatchResults(teamIdentifier, season);

		if (!results) {
			throw new Error('Result Not Available')
		}

		res.json({
			success: true,
			results
		})
	} catch(err) {
		console.log(err);
		next(err);
	}
});