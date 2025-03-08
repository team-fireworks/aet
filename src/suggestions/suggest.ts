import fzy from "@rbxts/fzy";
import { LibCommand } from "types";

export const suggestionCache = new Map<string, LibCommand[]>();
export const suggestionScores = new Map<string, Map<LibCommand, number>>();

export function scoreOf(query: string, command: LibCommand) {
	let queryScores = suggestionScores.get(query);

	if (!queryScores) {
		queryScores = new Map();
		suggestionScores.set(query, queryScores);
	}

	const score = queryScores.get(command);

	if (score) return score;

	const commandScore = fzy.score(query, command.name);
	queryScores.set(command, commandScore);

	return commandScore;
}

// TODO: suggest based on past use
export function suggest(query: string, commands: LibCommand[]) {
	const queryLower = query.lower();

	if (suggestionCache.has(queryLower)) return suggestionCache.get(queryLower)!;

	const filtered = commands
		.filter(({ name }) => fzy.has_match(queryLower, name.lower()))
		.sort((lhs, rhs) => scoreOf(queryLower, lhs) < scoreOf(queryLower, rhs));

	return filtered;
}
