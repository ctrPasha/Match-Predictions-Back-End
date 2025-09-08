import { parse } from 'path';
import { Score, FullScore } from '../../interfaces/footballdata/score';

export function parseScore(res: any, homeTeam: string, awayTeam: string): Score {
    let winningTeam: any = '';

    if (res.winner === 'HOME_TEAM') {
        winningTeam = homeTeam;
    } else if (res.winner === 'AWAY_TEAM') {
        winningTeam = awayTeam;
    } else if (res.winner === 'DRAW') {
        winningTeam = 'DRAW';
    } else {
        winningTeam = null;
    }

    return {
        winner: winningTeam ?? null,
        duration: res.duration ?? 'Unknown',
        fullTime: parseFullScore(res.fullTime),
        halfTime: parseFullScore(res.halfTime)
    };
}

export function parseFullScore(res: any): FullScore {
    return {
        home: res.home ?? null,
        away: res.away ?? null
    };
}
