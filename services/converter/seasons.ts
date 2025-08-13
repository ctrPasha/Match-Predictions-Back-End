import { Season } from "../../interfaces/footballdata/season";

export function parseSeason(res: any): Season {
	const startYear = res.startDate.split('-')[0];
	const endYear = res.endDate.split('-')[0];
	
	const formatedSeason = `${startYear}/${endYear}`;
	
	return  {
		year: formatedSeason
	}
}

/*
export function formatDate(season: { startDate: string, endDate: string }): string {
	const startYear = new Date(season.startDate).getFullYear() % 100;
	const endYear = new Date(season.endDate).getFullYear() % 100;

	const formatedSeason = `${startYear}/${endYear}`;
	return formatedSeason;
}*/