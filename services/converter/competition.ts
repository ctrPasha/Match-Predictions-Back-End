import { Competition } from "../../interfaces/footballdata/competition";

export function parseCompetiton(res: any): Competition {
	return {
		name: res.name,
		code: res.code,
		type: res.type,
	};
}