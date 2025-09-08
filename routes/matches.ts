import * as MatchDataController from '../controllers/matchdata';
import { Router, Request, Response, NextFunction } from 'express';

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

router.get('/:teamId/results', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teamIdentifier = req.params.teamId as string;
		const season = req.query.season as string;

		const results = await MatchDataController.getMatchResults(teamIdentifier, season);

		res.json({
			success: true,
			results
		})
	} catch(err) {
		console.log(err);
		next(err);
	}
});