import { Router, Request, Response, NextFunction } from "express";
import { SEASON_COMPETITIONS } from "../season_competitions.config";

export const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const currYear = new Date().getFullYear();
		// YOu need to accept the season query and get it here, otherwise it will always default to 2025
		const season = req.query.season as string || currYear; // req.queryParams or something like that

		// This finds an object that includes both season and competitions properties
		const seasonCompetitions = SEASON_COMPETITIONS.find(obj => obj.season == season);
		
		res.json({
			success: true,
			competitions: seasonCompetitions?.competitions,
			season: seasonCompetitions?.season
		});
	} catch (err) {
		next(err);
	}
});