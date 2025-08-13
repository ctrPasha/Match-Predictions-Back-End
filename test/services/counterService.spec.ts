import * as CounterService from '../../services/counter';
import * as DataBase from '../../services/database'

import { expect } from "chai";

describe("Counter Service", () => {
	before(async () => {
		await DataBase.init();
	});

	it("Creates a new counter if one didnt exist, if it did, returns the count", async () => {
		const counter = await CounterService.getCounter();
		expect(counter).to.be.a("number");
	});

	it("Should increment the count, and save to the database", async () => {
		const currCount = await CounterService.getCounter();
		const newCount = await CounterService.increment();
		expect(newCount).to.equal(currCount.valueOf() + 1);
	});

	it("Should decrement the count, and save to the database", async () => {
		const currCount = await CounterService.getCounter();
		const newCount = await CounterService.decrement();
		expect(newCount).to.equal(currCount.valueOf() - 1);
	});
});

