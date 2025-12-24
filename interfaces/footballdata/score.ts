export interface Score {
	winner: string | null;
	duration: string | null;
	fullTime: FullScore;
	halfTime: FullScore;	
	regularTime: FullScore,
	extraTime: FullScore,
	penalties: FullScore
}

export interface FullScore {
	home: number | null;
	away: number | null;
}