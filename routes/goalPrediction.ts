import { Router, Request, Response, NextFunction } from 'express';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';
export const router = Router();

router.get('/prediction/goals', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const competitionCode =  req.query.competitionCode as string;
		const homeId = req.query.homeId as string;
		const awayId = req.query.awayId as string;
		const seasonYear = req.query.seasonYear as string;

		
	} catch (err) {
		console.log(err);
		next(err);
	}
});