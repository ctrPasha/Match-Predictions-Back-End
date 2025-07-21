import { SequelizeCounterModel } from "../models/counter";
import { Counter } from "../interfaces/models/counter";
import { Sequelize } from "sequelize";

export async function create(): Promise<SequelizeCounterModel> {
	return await SequelizeCounterModel.create();
}

export async function get(): Promise<SequelizeCounterModel | null> {
	return await SequelizeCounterModel.findOne();
}

export async function setCounter(num: number): Promise<SequelizeCounterModel | null> {
	const count = await get();

	if (!count) {
		return null;
	}

	count.counter = num;
	await count.save();
	return count;	
}

export async function increment(): Promise<Number | undefined> {
	const count = await get();
	
	if (!count) {
		return;
	}

	count.counter += 1;
	await count.save();
	return count.counter;	
}

export async function decrement(): Promise<Number | undefined> {
	const count = await get();
	
	if (!count) {
		return;
	}

	if (count.counter == 0) {
		return 0;
	}

	count.counter -= 1;
	await count.save();
	return count.counter;
}

