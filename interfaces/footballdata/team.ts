import { Coach } from "./coach";

export interface MatchTeam {
	name: string;
	shortName: string;
	tla: string;
}	

export interface Team {
	name: string;
	shortName: string;
	tla: string;
	crest: string;
	clubColors?: string;
	coach?: Coach;
    venue?: string;
	founded?: number;
}

