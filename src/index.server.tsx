// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { plugin } from "plugin";
if (!plugin) throw "Aet must be run as a plugin.";

import { info, RobloxLogger, setDefaultLogger, trace, warn } from "log";

const [rootTrace] = debug.info(1, "s");

setDefaultLogger(
	new RobloxLogger({
		aliases: {
			[rootTrace]: "aet",
		},
	}),
);

import Fusion, { peek } from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import { CoreGui, UserInputService } from "@rbxts/services";
import { addCoreExtensions } from "core-extensions";
import { commands, getCommandPredicateResult, newCommandContext } from "lib/commands";
import { scope } from "scope";
import { suggest } from "suggestions/suggest";
import { LibCommand } from "types";
import { Hydrate } from "ui/components/foundation/Fusion";
import { CommandPallete } from "ui/components/pallete/CommandPallete";

info("Starting up!");

plugin.Unloading.Once(() => {
	info("Shutting down!");
	scope.doCleanup();
});

info("Pushing core extensions");
addCoreExtensions();

const commandsAsArray = scope.Computed((use) => Object.keys(use(commands)));

const searchInput = scope.Value("");
const suggestedCommands = scope.Computed((use) => suggest(use(searchInput), use(commandsAsArray)));
scope.Observer(suggestedCommands).onBind(() =>
	trace(
		"Suggested commands:",
		peek(suggestedCommands)
			.map(({ name }) => name)
			.join(", "),
	),
);

const refSearchInput = scope.Value<Maybe<TextBox>>(undefined);

const selectedIndex = scope.Value(0);
const selectedCommand = scope.Computed((use) => use(suggestedCommands)[use(selectedIndex)]);

const isCommandPalleteVisible = scope.Value(false);

function captureFocus() {
	trace("Capturing focus");

	const isCommandPalleteVisibleNow = peek(isCommandPalleteVisible);
	if (!isCommandPalleteVisibleNow) {
		searchInput.set("");
	}

	selectedIndex.set(0);
	isCommandPalleteVisible.set(true);

	const ref = peek(refSearchInput);
	if (ref) {
		ref.CaptureFocus();
	}
}

function releaseFocus() {
	trace("Releasing focus");

	const ref = peek(refSearchInput);
	if (ref) {
		ref.ReleaseFocus();
	}

	isCommandPalleteVisible.set(false);
}

function runCommand(cmd: LibCommand) {
	trace("Running command", cmd.name);
	releaseFocus();

	const [runOk, runValue] = pcall(cmd.run, newCommandContext(scope, cmd._extension, cmd));
	if (!runOk) {
		warn(`Failed to run command "${cmd.name}":`, runValue as never);
	}
}

function handleInput(input: InputObject, _gameProcessed: boolean) {
	switch (input.KeyCode) {
		case Enum.KeyCode.Up:
			trace("Decreasing selected index");
			if (peek(selectedIndex) > 0) selectedIndex.set(peek(selectedIndex) - 1);
			return;
		case Enum.KeyCode.Down:
			trace("Incrementing selected index");
			if (peek(selectedIndex) < peek(suggestedCommands).size() - 1) selectedIndex.set(peek(selectedIndex) + 1);
			return;
		case Enum.KeyCode.Escape:
			releaseFocus();
			return;
		case Enum.KeyCode.Return:
			trace("Returned");
			const selectedCommandNow = peek(selectedCommand);
			if (selectedCommandNow && getCommandPredicateResult(peek, selectedCommandNow).ok) {
				runCommand(selectedCommandNow);
			}
			return;
	}
}

scope.push(UserInputService.InputBegan.Connect(handleInput));

info("Creating plugin action");

const summonAet = plugin.CreatePluginAction("summonAet", "Summon Aet", "Summons the Aet command pallete");

scope.push(summonAet.Triggered.Connect(captureFocus), summonAet);

info("Mounting command pallete");

const holder = new Instance("ScreenGui");

<Hydrate scope={scope} instance={holder} Name="Aet Command Pallete" ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
	<CommandPallete
		scope={scope}
		visible={isCommandPalleteVisible}
		searchInput={searchInput}
		onSearchInputChanged={(input) => searchInput.set(input)}
		refSearchInput={refSearchInput}
		suggestedCommands={suggestedCommands}
		selectedCommand={selectedCommand}
		onRunCommand={runCommand}
	/>
</Hydrate>;

holder.Parent = CoreGui;

info("Startup finished!");
