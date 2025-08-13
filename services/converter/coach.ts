import { Coach } from "../../interfaces/footballdata/coach";

export function parseCoach(res: any): Coach {
	return {	
		firstName: res?.firstName ?? "",
		lastName: res?.lastName ?? "",
		name: res?.name ?? "",
	};
}

