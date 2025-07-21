import * as CounterService from "../services/counter"

import { Router, Request, Response, NextFunction } from "express";

export const router = Router();

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
	
	const currCounter = await CounterService.getCounter();

	res.json({
		counter: currCounter
	});
});

router.post('/increment', async(req: Request, res: Response, next: NextFunction) => {
	const increment = await CounterService.increment();

	res.json({
		counter: increment
	});
});	

router.post('/decrement', async(req: Request, res: Response, next: NextFunction) => {
	const decrement = await CounterService.decrement();

	res.json({
		counter: decrement
	});
});

