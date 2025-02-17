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

import Fusion, { Children, peek } from "@rbxts/fusion";
import { runTool, tools } from "lib";
import { Notifications } from "notifications";
import { plugin } from "plugin";
import { App } from "ui/app/app";
import { HintGui } from "ui/components/foundational/hint";
import { scope } from "ui/scoped";

const CoreGui = game.GetService("CoreGui");

const BUILT_IN_TOOLS = script.WaitForChild("builtins");

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

info("Running initial tools");
for (const v of tools) runTool({ tool: v });

info("Creating plugin toolbar");
const toolbar = plugin.CreateToolbar("Ethereal");
const button = toolbar.CreateButton(
	"ethereal",
	"Full-featured Eternal Towers of Hell companion plugin",
	assets.images.ethereal,
	"Launch Ethereal",
);

const widget = plugin.CreateDockWidgetPluginGui(
	"etherealMain",
	new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, false, false, 400, 300, 400, 300),
);
const isWidgetOpen = scope.Value(false);

scope.Hydrate(widget)({
	Name: "ethereal",
	Title: "Ethereal",
	Enabled: isWidgetOpen,
	[Children]: [<App scope={scope} />, <HintGui scope={scope} widget={widget} />],
});

scope.push(
	toolbar,
	button,
	widget,
	button.Click.Connect(() => isWidgetOpen.set(!peek(isWidgetOpen))),
);

info("Creating notifications");
scope.Hydrate(CoreGui)({
	[Children]: <Notifications scope={scope} />,
});

info("Startup finished!");
