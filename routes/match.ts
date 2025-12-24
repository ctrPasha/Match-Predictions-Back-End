import * as MatchDataController from '../controllers/matchdata';
import { Router, Request, Response, NextFunction } from 'express';
import { BASE_URL } from './footballData';

export const router = Router();


router.get('/:match_id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const matchId = req.params.match_id as string;

		const match = await MatchDataController.getMatchByMatchId(matchId);
		const seasonFolder = match?.seasonYear.split('/')[0];

		if (!match) {
			throw new Error('');
		}

		const homeTeamCrestFile = match?.homeTeamName.replace(/[^a-z0-9]/gi, '_') + '.png';
		const homeTeamCrestPath = `${BASE_URL}assets/${match?.competitionCode}/${seasonFolder}/${homeTeamCrestFile}`;

		const awayTeamCrestFile = match?.awayTeamName.replace(/[^a-z0-9]/gi, '_') + '.png';
		const awayTeamCrestPath = `${BASE_URL}assets/${match?.competitionCode}/${seasonFolder}/${awayTeamCrestFile}`;


		console.log(homeTeamCrestPath);
		console.log(awayTeamCrestPath);
		res.json({...match?.dataValues, homeTeamCrest: homeTeamCrestPath, awayTeamCrest: awayTeamCrestPath});
	} catch (err) {
		throw new Error("Match not found");
	}
});