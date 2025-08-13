import { Area } from "../../interfaces/footballdata/area";

export function parseArea(res: any): Area {
	return {
		name: res.name,
		code: res.code,
	};
}