// From Ethereal, licensed under the GNU General Public License v3.0

if (!script.FindFirstAncestorWhichIsA("Plugin")) throw "Ethereal must be run as a plugin.";

const [rootTrace] = debug.info(1, "s");

import assets from "assets";
import { info, RobloxLogger, setDefaultLogger, trace } from "log";
setDefaultLogger(
	new RobloxLogger({
		aliases: {
			[rootTrace]: "ethereal",
		},
	}),
);

info("Starting up!");

import Fusion, { Children } from "@rbxts/fusion";
import { runTool, toolActions, tools } from "lib";
import { Notifications } from "notifications";
import { plugin, Toolbar, ToolbarButton } from "plugin";
import { App } from "ui/app/app";
import { scope } from "ui/scoped";

const CoreGui = game.GetService("CoreGui");

const BUILT_IN_TOOLS = script.WaitForChild("lib").WaitForChild("builtins");

plugin.Unloading.Once(() => {
	trace("Shutting down!");
	scope.doCleanup();
});

// // This has to be initialized first so we can attach our Fusion debugger
// if (IS_DEV)
// 	scope.spawnTask(() => {
// 		info("Creating debug window");
// 		const root = (<screengui scope={scope} Name="etherealDebug" />) as GuiBase;
// 		root.Parent = game.GetService("CoreGui");
// 		Iris.UpdateGlobalConfig({ UseScreenGUIs: false });
// 		Iris.Init(root);
// 		scope.push(Iris.Connect(createDebug()), () => Iris.Shutdown());
// 	});

const builtinModules = BUILT_IN_TOOLS.GetDescendants().filter((v) => classIs(v, "ModuleScript"));
info(`Requiring builtin tool modules: ${builtinModules.map((v) => v.Name).join(", ")}`);
for (const v of builtinModules) require(v);

for (const v of tools)
	runTool({
		tool: v,
		args: new Map(),
	});

print(toolActions);

info("Creating plugin toolbar");
new Toolbar(scope, "Ethereal")
	.button(
		new ToolbarButton(
			scope,
			"Launch Ethereal",
			"etherealMain",
			"Tool suite for Eternal Towers of Hell",
			assets.images.ethereal,
		).widget(
			"Ethereal",
			"etherealMain",
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, false, false, 400, 300, 400, 300),
			<App scope={scope} />,
		),
	)
	.build();

info("Creating notifications");
scope.Hydrate(CoreGui)({
	[Children]: <Notifications scope={scope} />,
});

info("Startup finished!");
