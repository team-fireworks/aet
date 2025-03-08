// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { plugin } from "plugin";
if (!plugin) throw "Aet must be run as a plugin.";

import { info, RobloxLogger, setDefaultLogger, trace } from "log";

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
import { CoreGui } from "@rbxts/services";
import { pushCoreExtensions } from "lib/coreExtensions";
import { commands } from "lib/extensions";
import { LibCommand } from "lib/types";
import { scope } from "scope";
import { suggest } from "suggestions/suggest";
import { Hydrate } from "ui/components/foundation/Fusion";
import { CommandPallete } from "ui/components/pallete/CommandPallete";

info("Starting up!");

plugin.Unloading.Once(() => {
	info("Shutting down!");
	scope.doCleanup();
});

info("Pushing core extensions");
pushCoreExtensions();

const commandsAsArray = scope.Computed((use) => Object.keys(use(commands)));
const query = scope.Value("Hello");
const suggestedCommands = scope.Computed((use) => suggest(use(query), use(commandsAsArray)));

const isCommandPalleteVisible = scope.Value(false);

function captureFocus() {
	info("Capturing focus");
	isCommandPalleteVisible.set(!peek(isCommandPalleteVisible));
}

function releaseFocus() {}

scope.Observer(suggestedCommands).onBind(() =>
	trace(
		"Suggested commands:",
		peek(suggestedCommands)
			.map(({ name }) => name)
			.join(", "),
	),
);

info("Creating plugin action");

const summonAet = plugin.CreatePluginAction("summonAet", "Summon Aet", "Summons the Aet command pallete");

scope.push(summonAet.Triggered.Connect(captureFocus), summonAet);

info("Mounting command pallete");

function onRunCommand(cmd: LibCommand) {
	info("Running command", cmd.name);
}

const holder = new Instance("ScreenGui");

<Hydrate scope={scope} instance={holder} Name="Aet Command Pallete" ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
	<CommandPallete
		scope={scope}
		visible={isCommandPalleteVisible}
		suggestedCommands={suggestedCommands}
		selectedCommand={undefined}
		onRunCommand={onRunCommand}
	/>
</Hydrate>;

holder.Parent = CoreGui;

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
