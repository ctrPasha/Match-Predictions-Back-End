import { SequelizeTeamModel } from '../models/teamdata';
import {v4 as uuid} from 'uuid'

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
    venue: string,
    publicId: string | null
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
            public_identifier: publicId ? publicId : uuid()
        },
        {
            //transaction:
        }
    );
}

export async function bulkCreate(teams: any[]): Promise<SequelizeTeamModel[]> {
    return await SequelizeTeamModel.bulkCreate(teams);
}

// Just grabs one single team, standard get function
export async function get(teamName: string): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            teamName
        }
    });
}

// Gets a specific team based on the league, the team name, and the seasonYear(eg: PL/Liverpool?season=2024/2025)
// Also used for check if that team exists in the DB
export async function getUniqueTeam(
    competitionCode: string,
    shortName: string,
    seasonYear: string
): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            competitionCode,
            shortName,
            seasonYear
        }
    });
}

// areaCode and shortName or full name -> rturn team or a null
// We need a function that will grab us a team from db if it exists, based onlu on team name and area code.
export async function getTeamByNameAndArea(shortName: string, areaCode: string): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            shortName,
            areaCode
        }
    })
}

export async function getTeamByName(shortName: string): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            shortName,
        }
    })
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
export async function getTeamByPublicIdentifier(publicId: string): Promise<SequelizeTeamModel | null> {
    return await SequelizeTeamModel.findOne({
        where: {
            publicId
        }
    });
}
