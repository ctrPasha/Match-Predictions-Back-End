import { parse } from "path";
import { Score, FullScore } from "../../interfaces/footballdata/score";

export function parseScore(res: any, homeTeam: string, awayTeam: string): Score {
    let winningTeam: string = "";

    if (res.winner === "HOME_TEAM") {
        winningTeam = homeTeam;
    } else if (res.winner === "AWAY_TEAM") {
        winningTeam = awayTeam;
    } else if (res.winner === "DRAW") {
        winningTeam = "DRAW";
    }

    return {
        winner: winningTeam,
        duration: res.duration ?? "Unknown",
        fullTime: parseFullScore(res.fullTime),
        halfTime: parseFullScore(res.halfTime),
    };
}

export function parseFullScore(res: any): FullScore {
    return {
        home: res.home ?? null,
        away: res.away ?? null,
    };
}
