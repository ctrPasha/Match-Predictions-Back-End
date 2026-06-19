// Safely convert a CSV cell to a number-or-null.
function toIntOrNull(value: string | undefined): number | null {
    if (value === undefined || value.trim() === "") {
        return null;
    }
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
}

// Transform a CSV row into a structured object with typed properties.
export function transformCsvStats(row: Record<string, string>) {
    return {
        homeShots: toIntOrNull(row.HS),
        awayShots: toIntOrNull(row.AS),
        homeShotsOnTarget: toIntOrNull(row.HST),
        awayShotsOnTarget: toIntOrNull(row.AST),
        homeCorners: toIntOrNull(row.HC),
        awayCorners: toIntOrNull(row.AC),
        homeFouls: toIntOrNull(row.HF),
        awayFouls: toIntOrNull(row.AF),
        homeYellowCards: toIntOrNull(row.HY),
        awayYellowCards: toIntOrNull(row.AY),
        homeRedCards: toIntOrNull(row.HR),
        awayRedCards: toIntOrNull(row.AR),
    };
}