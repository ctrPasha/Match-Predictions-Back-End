import * as TeamDataController from '../controllers/teamdata';

import { Router, Request, Response, NextFunction } from 'express';
import { BASE_URL } from './footballData';

export const router = Router();


// Fetches teams for a specific league(ex: PL, BL1, CL etc..)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitionCode = req.query.competition as string;
        const seasonYear = req.query.season as string;

        if (!seasonYear) {
            throw new Error('Invalid Season');
        }

        const currTeams = await TeamDataController.getLeagueTeams(competitionCode, seasonYear);

        res.json(currTeams);
    } catch (err) {
        throw err;
    }
});

/* router.get('/:teamIdentifier', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teamIdentifier = req.params.teamIdentifier as string;
		
		const team = await FootballController.getTeamByPublicIdentifier(teamIdentifier);
		const seasonFolder = team?.seasonYear.split('/')[0];

		if (!team) {
			throw new Error(`${team} not found`)
		}

		const crestFile = team.teamName.replace(/[^a-z0-9]/gi, '_') + '.png';
		const crestPath = `${BASE_URL}assets/${team.competitionCode}/${seasonFolder}/${crestFile}`;

		res.json({...team.dataValues, crest: crestPath});

	} catch(err) {
		next(err);
	}
}); */

// Fetches the specific team based off the competition code and its short-name(ex: Liverpool instead of Liverpool FC)
router.get('/:competitionCode/:shortName', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitionCode = req.params.competitionCode as string;
        const shortName = req.params.shortName as string;
        const season = req.query.seasonYear as string;

        const formattedName = shortName.replace(/-/g, ' ');

        const team = await TeamDataController.getUniqueTeam(competitionCode, formattedName, season);
        const seasonFolder = team?.seasonYear.split('/')[0];

        if (!team) {
            throw new Error(`${team} not found`);
        }

        const crestFile = team.teamName.replace(/[^a-z0-9]/gi, '_') + '.png';
        const crestPath = `${BASE_URL}assets/${team.competitionCode}/${seasonFolder}/${crestFile}`;

        res.json({ ...team.dataValues, crest: crestPath });
    } catch (err) {
        next(err);
    }
});