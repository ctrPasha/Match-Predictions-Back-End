export interface Score {
	winner: string | null;
	duration: string;
	fullTime: FullScore;
	halfTime: FullScore;	
}

export interface FullScore {
	home: number | null;
	away: number | null;
}