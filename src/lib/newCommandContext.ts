import { CommandContext } from "@rbxts/et";
import { LibCommand, LibExtension } from "lib/types";
import { Scope } from "scope";

export function newCommandContext(scope: Scope, ext: LibExtension, cmd: LibCommand): CommandContext {
	return table.freeze<CommandContext>({
		getSelectedTower() {
			throw `not yet implemented`;
		},

		hideMainView() {
			throw `not yet implemented`;
		},
	});
}
