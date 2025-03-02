// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { plugin } from "plugin";
if (!plugin) throw "Ethereal must be run as a plugin.";

const [rootTrace] = debug.info(1, "s");

import { EtherealPermissioned } from "@rbxts/et-for-plugins";
import { Children, peek } from "@rbxts/fusion";
import { CoreGui } from "@rbxts/services";
import { App } from "app";
import { commands, tempFakePermissioned } from "core";
import { info, RobloxLogger, setDefaultLogger } from "log";
import { scope } from "scope";

setDefaultLogger(
	new RobloxLogger({
		aliases: {
			[rootTrace]: "ethereal",
		},
	}),
);

info("Starting up!");

plugin.Unloading.Once(() => scope.doCleanup());

// TODO: find a better way :(
for (const mod of script.WaitForChild("core").WaitForChild("commands").GetDescendants()) {
	if (!classIs(mod, "ModuleScript")) continue;
	const modFn = require(mod) as (et: EtherealPermissioned) => void;

	if (!typeIs(modFn, "function")) continue;

	modFn(tempFakePermissioned);
}

commands.set(peek(commands));

const app = new App(scope);

const ui = new Instance("ScreenGui");
scope.Hydrate(ui)({
	Name: "Et",
	[Children]: app.render(),
});

const action = plugin.CreatePluginAction("launchEt", "Launch Et", "Launches the Et command pallete");

scope.push(
	action.Triggered.Connect(() => app.captureFocus()),
	action,
);

ui.Parent = CoreGui;
