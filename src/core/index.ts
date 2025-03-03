// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Command, CommandRun, EtPermissioned } from "@rbxts/et-for-plugins";
import { peek } from "@rbxts/fusion";
import Sift from "@rbxts/sift";
import { plugin } from "plugin";
import { scope } from "scope";
import { CoreCommand, CorePlugin } from "./types";

export const plugins = scope.Value<CorePlugin[]>([]);
export const commands = scope.Value<CoreCommand[]>([]);

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

export function createCorePlugin(name: string, icon: string) {
	const p: CorePlugin = table.freeze({
		_plugin: plugin,
		_name: name,
		_icon: icon,
	});

	peek(plugins).push(p);
	plugins.set(peek(plugins));

	return p;
}

export function createCorePermissioned(plugin: CorePlugin) {
	const permissioned = table.freeze<EtPermissioned>({
		predicates: {} as never,
		registerCommand: (command) => {
			const newCommand: CoreCommand = {
				name: command.name,
				description: command.description,
				run: command.run,
				predicates: command.predicates,
				_plugin: plugin,
			};

			peek(commands).push(newCommand);
			commands.set(peek(commands));
		},
	});

	return permissioned;
}
