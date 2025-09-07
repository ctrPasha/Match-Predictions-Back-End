import { Router, Request, Response, NextFunction } from 'express';
import * as teamsRoutes from './teams';
import * as leaguesRoutes from './leagues';

export const router = Router();

router.use('/teams', teamsRoutes.router);
router.use('/leagues', leaguesRoutes.router);
// router.use('/matches');