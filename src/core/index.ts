// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Command, CommandRun, EtPermissioned } from "@rbxts/et-for-plugins";
import { peek } from "@rbxts/fusion";
import Sift from "@rbxts/sift";
import { scope } from "scope";

export interface LibCommand extends Command {}

export const commands = scope.Value<Command[]>([]);

export function createCommandRun(): CommandRun {
	return Sift.Dictionary.freezeDeep({
		selectedTower: undefined,

		promptColor3(placeholderLabel, initial) {
			throw "not yet implemented";
		},

		promptColorSequence(placeholderLabel, initial) {
			throw "not yet implemented";
		},

		promptString(placeholderLabel, initial) {
			throw "not yet implemented";
		},

		hideMainView() {
			throw "not yet implemented";
		},
	} satisfies CommandRun);
}

export function runCommand(command: Command) {
	command.run(createCommandRun());
}

export const tempFakePermissioned = {
	register: (command) => {
		peek(commands).push(command);
		commands.set(peek(commands));
	},
	predicates: {} as never,
} satisfies EtPermissioned;
