import { Router, Request, Response, NextFunction } from 'express';
import * as teamsRoutes from './teams';
import * as leaguesRoutes from './leagues';
import * as matchRoutes from './matches'


export const BASE_URL = 'http://localhost:3000/';
export const router = Router();

router.use('/teams', teamsRoutes.router);
router.use('/leagues', leaguesRoutes.router);
router.use('/matches', matchRoutes.router);