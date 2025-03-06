import { CommandContext } from "@rbxts/et";
import { CoreCommand, CoreExtension } from "core/types";
import { Scope } from "scope";

export function newCommandContext(scope: Scope, ext: CoreExtension, cmd: CoreCommand): CommandContext {
	return table.freeze<CommandContext>({
		getSelectedTower() {
			throw `not yet implemented`;
		},

		askString(purpose, initial) {
			throw `not yet implemented`;
		},

		askColor3(purpose, initial) {
			throw `not yet implemented`;
		},

		askColorSequence(purpose, initial) {
			throw `not yet implemented`;
		},

		hideMainView() {
			throw `not yet implemented`;
		},
	});
}
