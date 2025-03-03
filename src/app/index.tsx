// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { CommandRun } from "@rbxts/et-for-plugins";
import Fusion, { peek, UsedAs, Value } from "@rbxts/fusion";
import { UserInputService } from "@rbxts/services";
import { commands, createCommandRun } from "core";
import { CoreCommand } from "core/types";
import { Connect, event, Fire } from "libs/event";
import { Scope } from "scope";
import { Search } from "./search";
import { CommandPallete } from "./ui/CommandPallete";

export class App {
	private search: Search;
	private currentSearchInput: Value<string>;
	private visible: Value<boolean>;
	private selectedIndex: Value<number>;
	private listedCommands: UsedAs<CoreCommand[]>;
	private selectedCommand: UsedAs<Maybe<CoreCommand>>;
	private onDoSearchFocus: Connect<[]>;
	private focusSearch: Fire<[]>;
	private runners: Map<CoreCommand, CommandRun>;

	constructor(private scope: Scope) {
		this.search = new Search();
		this.currentSearchInput = this.scope.Value("");
		this.visible = this.scope.Value(false);
		this.selectedIndex = this.scope.Value(0);
		this.runners = new Map();
		const [onDoSearchFocus, focusSearch] = event();
		this.onDoSearchFocus = onDoSearchFocus;
		this.focusSearch = focusSearch;

		this.listedCommands = this.scope.Computed((use) => {
			return this.search.search(use(this.currentSearchInput), use(commands));
		});

		this.selectedCommand = this.scope.Computed((use) => use(this.listedCommands)[use(this.selectedIndex)]);

		this.scope.push(
			UserInputService.InputBegan.Connect((input, gameProcessed) => {
				this.handleInput(input, gameProcessed);
			}),
		);
	}

	async captureFocus() {
		this.visible.set(true);
		this.focusSearch();
	}

	async releaseFocus() {
		this.visible.set(false);
	}

	// TODO: holding Up/Down should keep scrolling
	// TODO: alternate Up/Down controls
	private handleInput(input: InputObject, gameProcessed: boolean) {
		switch (input.KeyCode) {
			case Enum.KeyCode.Up:
				if (peek(this.selectedIndex) > 0) this.selectedIndex.set(peek(this.selectedIndex) - 1);
				return;
			case Enum.KeyCode.Down:
				if (peek(this.selectedIndex) < peek(this.listedCommands).size() - 1)
					this.selectedIndex.set(peek(this.selectedIndex) + 1);
				return;
			case Enum.KeyCode.Escape:
				this.releaseFocus();
				return;
			case Enum.KeyCode.Return:
				const selectedCommand = peek(this.selectedCommand);
				if (selectedCommand) this.runCommand(selectedCommand);
				return;
		}
	}

	async runCommand(cmd: CoreCommand) {
		let run = this.runners.get(cmd);
		if (!run) {
			const newRun = createCommandRun();
			this.runners.set(cmd, newRun);
			run = newRun;
		}

		const [ok, v] = pcall(cmd.run, run);
		if (!ok) warn(`Error running command "${cmd.name}: ${v}"`);

		this.releaseFocus();
	}

	render() {
		return (
			<CommandPallete
				scope={this.scope}
				visible={this.visible}
				searchInput={this.currentSearchInput}
				onSearchChanged={(s) => this.currentSearchInput.set(s)}
				onDoSearchFocus={this.onDoSearchFocus}
				onSearchFocusLost={() => {}}
				listedCommands={this.listedCommands}
				selectedCommand={this.selectedCommand}
				onCommandRun={(cmd) => this.runCommand(cmd)}
			/>
		);
	}
}
