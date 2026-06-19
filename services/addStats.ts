import { parse } from "csv-parse/sync";
import { readFileSync, readdirSync } from "fs";

import { transformCsvStats } from "./converter/csvStats";
import { CSV_TEAM_NAMES } from "./csv/teamMap";
import * as MatchDataController from "../controllers/matchdata";

const CSV_DIR = "csv_data";

// One league-season file, e.g. addFromCsv("PL", "2025") -> reads PL_25_26.csv
export async function addFromCsv(league: string, season: string): Promise<void> {
	const file = fileName(league, season);
	await addStats(file, league, season);
}

// Every CSV in the folder, deriving league + season from each filename
export async function addAllFromCsv(): Promise<void> {
    const leagueDirs = readdirSync(CSV_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory());

    for (const dir of leagueDirs) {
        const files = readdirSync(`${CSV_DIR}/${dir.name}`)
            .filter(f => f.endsWith(".csv"));

        for (const file of files) {
            const { league, season } = parseFileName(file);
            await addStats(`${dir.name}/${file}`, league, season);  // path includes subfolder
        }
    }
}

// Reads one file, matches each row to a DB match, and writes the stat columns
async function addStats(file: string, league: string, season: string): Promise<void> {
	console.log("league:", JSON.stringify(league), "mapKeys:", Object.keys(CSV_TEAM_NAMES));
	console.log("sample:", CSV_TEAM_NAMES[league]["Como"], CSV_TEAM_NAMES[league]["Pisa"]);


	const rows: Record<string, string>[] = parse(
		readFileSync(`${CSV_DIR}/${file}`, "utf-8"),
		{ columns: true, skip_empty_lines: true, trim: true }
	);



	const nameMap = CSV_TEAM_NAMES[league] ?? {};
	let updated = 0;
	const unmatched = new Set<string>();

	for (const row of rows) {
		const home = nameMap[row.HomeTeam] ?? row.HomeTeam;
		const away = nameMap[row.AwayTeam] ?? row.AwayTeam;

		const match = await MatchDataController.findBySeasonAndTeams(season, home, away);
		if (!match) {
			unmatched.add(row.HomeTeam);
			unmatched.add(row.AwayTeam);
			continue;
		}

		await match.update(transformCsvStats(row));
		updated += 1;
	}

	console.log(`${file} -> ${league} ${season}: updated ${updated}, unmatched [${[...unmatched]}]`);
}

// "SA_25_26.csv" -> { league: "SA", season: "2025/2026" }
function parseFileName(file: string): { league: string; season: string } {
	const [league, startYear, endYear] = file.replace(".csv", "").split("_");
	return { league, season: `20${startYear}/20${endYear}` };
}

// "SA", "2025/2026" -> "SA_25_26.csv"
function fileName(league: string, season: string): string {
	const [start, end] = season.split("/");        // "2025", "2026"
	return `${league}_${start.slice(2)}_${end.slice(2)}.csv`;  // "SA_25_26.csv"
}