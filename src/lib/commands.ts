import { CommandPredicateResult } from "@rbxts/aet";
import { CommandContext } from "@rbxts/et";
import { Computed, peek, Use, UsedAs } from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import Sift from "@rbxts/sift";
import { IS_DEV } from "config";
import { extensions } from "lib/extensions";
import { selectedTower } from "lib/tower";
import { debug } from "log";
import { scope, Scope } from "scope";
import { LibCommand, LibExtension } from "types";
import { computePredicate } from "./predicates";

export const commands = scope.Computed((use): Set<LibCommand> => {
	const extensionsNow = use(extensions);
	const extensionCommands = Object.keys(extensionsNow).map(({ _commands }) => _commands);

	if (extensionCommands.size() > 0)
		return extensionCommands.reduce((total, commands) => {
			const newTotal = Sift.Set.copy(total);
			for (const cmd of commands) newTotal.add(cmd);
			return newTotal;
		});

	return new Set();
});

export const commandPredicateResults = scope.ForPairs(
	commands as never as Computed<Map<LibCommand, true>>,
	(use, _, cmd): LuaTuple<[command: LibCommand, result: CommandPredicateResult]> =>
		$tuple(cmd, cmd.predicates === undefined ? { ok: true } : computePredicate(use, cmd.predicates)),
);

export function getCommandPredicateResult(use: Use, cmd: UsedAs<LibCommand>): CommandPredicateResult {
	return use(commandPredicateResults).get(use(cmd))!;
}

if (IS_DEV)
	scope.Observer(commands).onBind(() =>
		debug(
			"Current commands:",
			Object.keys(peek(commands))
				.map(({ name }) => name)
				.join(", "),
		),
	);

export function newCommandContext(scope: Scope, ext: LibExtension, cmd: LibCommand): CommandContext {
	return table.freeze<CommandContext>({
		getSelectedTower() {
			return peek(selectedTower);
		},

		hideMainView() {
			throw `not yet implemented`;
		},
	});
}
