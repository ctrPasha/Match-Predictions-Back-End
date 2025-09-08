/* import { expect } from 'chai';
import * as DataBase from '../../services/database';
import * as TeamDataController from '../../controllers/teamdata';
import { SequelizeTeamModel } from '../../models/teamdata';
import { v4 as uuid } from 'uuid';
import { getDefaultCompilerOptions } from 'typescript';
import { Team } from '../../interfaces/footballdata/team';
import { Teams } from '../../interfaces/footballdata/teams';

describe('Team Data Controller', () => {
    const testTeam = {
        competitionCode: 'PL',
        competitionType: 'LEAGUE',
        seasonYear: '2025/2026',
        areaName: 'England',
        areaCode: 'ENG',
        teamName: 'Liverpool FC',
        shortName: 'Liverpool',
        tla: 'LIV',
        clubColors: 'Red / White',
        coachName: 'Jürgen Klopp',
        venue: 'Anfield',
        public_identifier: uuid()
    };

    const transformedTeam: Teams = {
        competition: {
            name: 'Premier League',
            code: 'PL',
            type: 'League'
        },

        season: {
            year: '2024/2025'
        },

        area: {
            name: 'ENGLAND',
            code: 'ENG'
        },

        team: {
            name: 'Liverpool FC',
            shortName: 'Liverpool',
            tla: 'LIV',
            crest: 'liverpool.png',
            clubColors: 'Red / White',
            coach: { name: 'Arne Slot' },
            venue: 'Anfield',
            founded: 1878
        }
    };

    before(async () => {
        await DataBase.init();
    });

    it.only('Should create a new team', async () => {
        const team = await TeamDataController.create(
            transformedTeam.competition.code,
            transformedTeam.competition.type,
            transformedTeam.season.year,
            transformedTeam.area.name,
            transformedTeam.area.code,
            transformedTeam.team.name,
            transformedTeam.team.shortName,
            transformedTeam.team.tla,
            transformedTeam.team.clubColors ?? '',
            transformedTeam.team.coach?.name ?? '',
            transformedTeam.team.venue ?? '',
            null
        );

        const duplicateteam = await TeamDataController.getUniqueTeam(
            transformedTeam.competition.code,
            transformedTeam.team.shortName,
            transformedTeam.season.year
        );

        console.log(duplicateteam);

        expect(team).to.be.instanceOf(SequelizeTeamModel);
        expect(team.teamName).to.equal(testTeam.teamName);
        expect(team.public_identifier).to.be.a('string');
    });

    it('Should fetch a team by name', async () => {
        const team = await TeamDataController.get(testTeam.teamName);
        expect(team).to.not.be.null;
        expect(team!.shortName).to.equal(testTeam.shortName);
    });

    it('Should fetch a team by name and area', async () => {
        const team = await TeamDataController.getTeamByNameAndArea(testTeam.shortName, testTeam.areaCode);
        expect(team).to.not.be.null;
        expect(team!.public_identifier).to.be.a('string');
    });

    it('Should fetch a unique team by competition, shortName, and season', async () => {
        const team = await TeamDataController.getUniqueTeam(
            testTeam.competitionCode,
            testTeam.shortName,
            testTeam.seasonYear
        );
        expect(team).to.not.be.null;
        expect(team!.competitionCode).to.equal(testTeam.competitionCode);
    });

    it('Should fetch teams by league and season', async () => {
        const teams = await TeamDataController.getLeagueTeams(testTeam.competitionCode, testTeam.seasonYear);
        expect(teams).to.be.an('array');
        expect(teams.length).to.be.greaterThan(0);
    });

    it('Should fetch a team by public identifier', async () => {
        const team = await TeamDataController.get(testTeam.teamName);
        const fetchedById = await TeamDataController.getTeamByPublicIdentifier(team!.public_identifier);
        expect(fetchedById).to.not.be.null;
        expect(fetchedById!.teamName).to.equal(testTeam.teamName);
    });

    it('Should bulk insert multiple teams', async () => {
        const teams = [
            {
                competitionCode: 'PL',
                competitionType: 'LEAGUE',
                seasonYear: '2025/2026',
                areaName: 'England',
                areaCode: 'ENG',
                teamName: 'Arsenal FC',
                shortName: 'Arsenal',
                tla: 'ARS',
                clubColors: 'Red / White',
                coachName: 'Mikel Arteta',
                venue: 'Emirates Stadium'
            },
            {
                competitionCode: 'PL',
                competitionType: 'LEAGUE',
                seasonYear: '2025/2026',
                areaName: 'England',
                areaCode: 'ENG',
                teamName: 'Manchester City',
                shortName: 'Man City',
                tla: 'MCI',
                clubColors: 'Sky Blue / White',
                coachName: 'Pep Guardiola',
                venue: 'Etihad Stadium'
            }
        ];

        const createdTeams = await TeamDataController.bulkCreate(teams);
        expect(createdTeams).to.be.an('array');
        expect(createdTeams.length).to.equal(2);
        expect(createdTeams[0].teamName).to.equal('Arsenal FC');
    });
});
 */