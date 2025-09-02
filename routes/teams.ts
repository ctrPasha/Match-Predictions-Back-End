import * as FootballController from '../controllers/teamdata'

import { Router, Request, Response, NextFunction } from "express";

export const router = Router();

const BASE_URL = 'http://localhost:3000/'

router.get('/', async(req: Request, res: Response, next: NextFunction) => {
	try {
	const competitionCode = req.query.competition as string;
	const seasonYear = req.query.season as string;

	if (!seasonYear) {
		throw new Error("Invalid Season");
	} 

	const currTeams = await FootballController.getLeagueTeams(competitionCode, seasonYear);

	res.json(currTeams);
	
	} catch(err) {
		throw err;
	}
});

router.get('/:teamIdentifier', async (req: Request, res: Response, next: NextFunction) => {
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

	} catch (err) {
		next(err);
	}
});