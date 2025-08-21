import { SequelizeTeamModel } from "../models/teamdata";

export async function create(
    competitionCode: string,
    competitionType: string,
    seasonYear: string,
    areaName: string,
    areaCode: string,
    teamName: string,
    shortName: string,
    tla: string,
    clubColors: string,
    coachName: string,
    venue: string
): Promise<SequelizeTeamModel> {
    return await SequelizeTeamModel.create(
        {
            competitionCode,
            competitionType,
            seasonYear,
            areaName,
            areaCode,
            teamName,
            shortName,
            tla,
            clubColors,
            coachName,
            venue,
        },
        {
            //transaction:
        }
    );
}

export async function bulkCreate(teams: any[]): Promise<SequelizeTeamModel[]> {
    return await SequelizeTeamModel.bulkCreate(teams)
}

// Just grabs one single team, standard get function
export async function get(
    teamName: string
): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            teamName,
        },
    });
}

// Fetches a single team, just used to check if that team is already in the db or not 
export async function getUniqueTeam(
    teamName: string,
    seasonYear: string,
): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            teamName,
            seasonYear
        },
    });
}

// Fetches teams by the league(competition) code(eg. PL, BL1, SA, etc) and season year 
export async function getLeagueTeams(competitionCode: string, seasonYear: string): Promise<SequelizeTeamModel[]> {
    return await SequelizeTeamModel.findAll({
        where: {
            competitionCode,
            seasonYear
        }
    });    
}

// Fetches a team from the db pased on its unique identifier
export async function getTeamByPublicIdentifier(public_identifier: string): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            public_identifier
        }
    })
}

