import * as StatsService from '../services/addStats';
import * as DataBase from '../services/database';
import args from "args";

args.option("league", "Code for the league, e.g.: PL");
args.option("season", "Season to add stats for, e.g.: 2025");
args.option("add-all", "Adds stats for every CSV in the data folder");

const options = args.parse(process.argv);

async function main(): Promise<void> {
	await DataBase.init();
	console.log("Connected to DB Successfuly!");

	await parseOptions();

	process.exit(0);
}

async function parseOptions(): Promise<void> {
	if (options.addAll) {
		await StatsService.addAllFromCsv();
	}

	if (options.league && options.season) {
		await StatsService.addFromCsv(options.league, options.season);
	}
}

main();