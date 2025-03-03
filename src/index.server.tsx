// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { plugin } from "plugin";
if (!plugin) throw "Et must be run as a plugin.";

const [rootTrace] = debug.info(1, "s");

import { Children, peek } from "@rbxts/fusion";
import { CoreGui } from "@rbxts/services";
import { App } from "app";
import { commands, createCorePermissioned, createCorePlugin } from "core";
import { CoreCommandModule } from "core/ty";
import { info, RobloxLogger, setDefaultLogger } from "log";
import { scope } from "scope";

setDefaultLogger(
	new RobloxLogger({
		aliases: {
			[rootTrace]: "et",
		},
	}),
);

info("Starting up!");

plugin.Unloading.Once(() => {
	info("Shutting down!");
	scope.doCleanup();
});

for (const mod of script.WaitForChild("core").WaitForChild("commands").GetDescendants()) {
	if (!classIs(mod, "ModuleScript")) continue;

	const commandMod = CoreCommandModule.Cast(require(mod));

	if (commandMod.some) {
		const { name, icon, run } = commandMod.value;
		const plugin = createCorePlugin(name, icon);
		const et = createCorePermissioned(plugin);
		run(et);
	}
}

info(
	`Registered default commands: ${peek(commands)
		.map((v) => v.name)
		.join(", ")}`,
);

commands.set(peek(commands));

info("New app");
const app = new App(scope);

info("Rendering app");
const ui = new Instance("ScreenGui");
scope.Hydrate(ui)({
	Name: "Et",
	[Children]: app.render(),
});

info("New plugin action");
const action = plugin.CreatePluginAction("launchEt", "Launch Et", "Launches the Et command pallete");

scope.push(
	action.Triggered.Connect(() => app.captureFocus()),
	action,
);

info("Parenting app to CoreGui");
ui.Parent = CoreGui;

info("Startup finished!");
