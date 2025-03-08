import type Aet from "@rbxts/aet";
import { CommandPredicate, CommandPredicateResult, CommandPredicateStates } from "@rbxts/aet";
import { Use } from "@rbxts/fusion";
import { selectedTower } from "lib/tower";

export const predicates: typeof Aet.predicates = table.freeze({
	isTowerSelected: (state) => {
		if (state.getSelectedTower() !== undefined) return { ok: true };
		else return { ok: false, reason: "No tower selected" };
	},
	isTowerNotSelected: (state) => {
		if (state.getSelectedTower() === undefined) return { ok: true };
		else return { ok: false, reason: "Tower selected" };
	},
	isKitVersion5_5: (_state) => {
		throw "not yet implemented";
	},
	isKitVersion6: (_state) => {
		throw "not yet implemented";
	},
});

export function computePredicate(use: Use, predicates: CommandPredicate[]): CommandPredicateResult {
	const state = table.freeze<CommandPredicateStates>({
		getSelectedTower() {
			return use(selectedTower);
		},
	});

	for (const predicate of predicates) {
		const result = predicate(state);
		if (!result.ok) return result;
	}

	return { ok: true };
}
