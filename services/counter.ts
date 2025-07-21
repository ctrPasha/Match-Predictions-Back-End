import * as CounterController from "../controllers/counter";

export async function getCounter(): Promise<Number> {
	const currCounter = await CounterController.get();
	
	if (currCounter) {
		return currCounter.counter;
	} 

	const newCounter = await CounterController.create();

	return newCounter.counter;
}	

export async function setCounter(num: number): Promise<Number> {
	const setCount = await CounterController.setCounter(num);

	if (!setCount) {
		return 0;
	}
	
	return setCount.counter
}

export async function increment(): Promise<Number | undefined> {
	const increase = await CounterController.increment();
	return increase;
}

export async function decrement(): Promise<Number | undefined> {
	const decrement = await CounterController.decrement();
	return decrement;
}