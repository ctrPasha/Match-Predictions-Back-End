import { Router, Request, Response, NextFunction } from 'express';
import * as teamsRoutes from './teams';
import * as leaguesRoutes from './leagues';
import * as matchesRoutes from './matches'
import * as matchRoutes from './match';

export const BASE_URL = 'http://localhost:3000/';
export const router = Router();

router.use('/teams', teamsRoutes.router);
router.use('/leagues', leaguesRoutes.router);
router.use('/matches', matchesRoutes.router);
router.use('/match', matchRoutes.router);