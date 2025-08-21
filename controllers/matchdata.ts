import { SequelizeMatchModel } from '../models/matchdata';

export async function create(
    areaName: string,
    areaCode: string,
    competitionCode: string,
    competitionType: string,
    seasonYear: string,
    homeTeamName: string,
    awayTeamName: string,
    scoreWinner: string,
    scoreDuration: string,
    fulltimeHome: number,
    fullTimeAway: number,
    halfTimeHome: number,
    halfTmeAway: number,
    match_id: number
): Promise<SequelizeMatchModel> {
    return await SequelizeMatchModel.create({
        areaName,
        areaCode,
        competitionCode,
        competitionType,
        seasonYear,
        homeTeamName,
        awayTeamName,
        scoreWinner,
        scoreDuration,
        fulltimeHome,
        fullTimeAway,
        halfTimeHome,
        halfTmeAway,
        match_id
    });
}

export async function bulkCreate(matches: any[]): Promise<SequelizeMatchModel[]> {
    return await SequelizeMatchModel.bulkCreate(matches);
}

export async function getUniqueMatch(
    homeTeamName: string,
    awayTeamName: string,
    seasonYear: string,
    match_id: number
): Promise<SequelizeMatchModel | null> {
    return await SequelizeMatchModel.findOne({
        where: {
            homeTeamName,
            awayTeamName,
            seasonYear,
            match_id
        }
    })
}

export async function getLeagueMatches(competitionCode: string, seasonYear: string): Promise<SequelizeMatchModel[]> {
    return await SequelizeMatchModel.findAll({
        where: {
            competitionCode,
            seasonYear
        }
    });
}

export async function getMatchByPublicId(match_identifier: string): Promise<SequelizeMatchModel | null> {
    return await SequelizeMatchModel.findOne({
        where: {
            match_identifier
        }
    });
}
