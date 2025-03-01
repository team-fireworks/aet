import { Command } from "@rbxts/ethereal-for-plugins";
import { Children, peek } from "@rbxts/fusion";
import { CoreGui } from "@rbxts/services";
import { App } from "app";
import { commands } from "core/commands";
import { plugin } from "plugin";
import { scope } from "scope";

plugin.Unloading.Once(() => scope.doCleanup());

// const etherealToolbar = plugin.CreateToolbar("Ethereal");
// const launchEthereal = etherealToolbar.CreateButton(
// 	"Ethereal",
// 	"Full-featured Eternal Towers of Hell companion plugin",
// 	assets.images.ethereal,
// 	"Ethereal",
// );

// scope.push(
// 	etherealToolbar,
// 	launchEthereal,
// 	launchEthereal.Click.Connect(() => mainWidget.visible.set(!peek(mainWidget.visible))),
// );
//

const app = new App(scope);

const ui = new Instance("ScreenGui");

for (const mod of script.WaitForChild("core").WaitForChild("commands").WaitForChild("builtins").GetDescendants()) {
	if (!classIs(mod, "ModuleScript")) continue;
	const modCommands = require(mod);

	if (!typeIs(modCommands, "table")) continue;

	for (const cmd of modCommands as Command[]) {
		if ("name" in cmd && "run" in cmd) {
			peek(commands).push(cmd);
		}
	}
}

commands.set(peek(commands));

scope.Hydrate(ui)({
	Name: "Ethereal",
	[Children]: app.render(),
});

const action = plugin.CreatePluginAction("summonEthereal", "Summon Ethereal", "wow");

scope.push(
	action.Triggered.Connect(() => app.visible.set(true)),
	action,
);

ui.Parent = CoreGui;
