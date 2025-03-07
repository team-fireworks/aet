// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { plugin } from "plugin";
if (!plugin) throw "Aet must be run as a plugin.";

import { info, RobloxLogger, setDefaultLogger } from "log";

const [rootTrace] = debug.info(1, "s");

setDefaultLogger(
	new RobloxLogger({
		aliases: {
			[rootTrace]: "aet",
		},
	}),
);

import { pushCoreExtensions } from "lib/coreExtensions";
import { scope } from "scope";

info("Starting up!");

plugin.Unloading.Once(() => {
	info("Shutting down!");
	scope.doCleanup();
});

info("Pushing core extensions");
pushCoreExtensions();

info("Startup finished!");

// for (const mod of script.WaitForChild("core").WaitForChild("commands").GetDescendants()) {
// 	if (!classIs(mod, "ModuleScript")) continue;

// 	const commandMod = CoreCommandModule.Cast(require(mod));

// 	if (commandMod.some) {
// 		const { name, icon, run } = commandMod.value;
// 		const plugin = createCorePlugin(name, icon);
// 		const et = createCorePermissioned(plugin);
// 		run(et);
// 	}
// }

// info(
// 	`Registered default commands: ${peek(commands)
// 		.map((v) => v.name)
// 		.join(", ")}`,
// );

// commands.set(peek(commands));

// info("New app");
// const app = new App(scope);

// info("Rendering app");
// const ui = new Instance("ScreenGui");
// scope.Hydrate(ui)({
// 	Name: "Et",
// 	[Children]: app.render(),
// });

// info("New plugin action");
// const action = plugin.CreatePluginAction("launchEt", "Launch Et", "Launches the Et command pallete");

// scope.push(
// 	action.Triggered.Connect(() => app.captureFocus()),
// 	action,
// );

// info("Parenting app to CoreGui");
// ui.Parent = CoreGui;

// info("Startup finished!");
