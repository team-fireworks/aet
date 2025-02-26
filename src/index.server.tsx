// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

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
import Iris from "@rbxts/iris";
import { CoreGui } from "@rbxts/services";
import { IS_DEV } from "constants";
import { createDebug } from "iris/debug";
import { initTool, tools } from "lib";
import { plugin } from "plugin";
import { scope } from "scoped";
import { App } from "ui/app/app";
import { HintGui } from "ui/components/hint";
import { Notifications } from "ui/notifications";

const BUILT_IN_TOOLS = script.WaitForChild("builtins");

if (IS_DEV)
	scope.spawnTask(() => {
		info("Creating debug window");
		const root = (<screengui scope={scope} Name="etherealDebug" />) as GuiBase;
		root.Parent = game.GetService("CoreGui");
		Iris.UpdateGlobalConfig({ UseScreenGUIs: false });
		Iris.Init(root);
		scope.push(Iris.Connect(createDebug(rootTrace)), () => Iris.Shutdown());
	});

plugin.Unloading.Once(() => {
	trace("Shutting down!");
	scope.doCleanup();
});

const builtinModules = BUILT_IN_TOOLS.GetDescendants().filter((v) => classIs(v, "ModuleScript"));
info(`Requiring builtin tool modules: ${builtinModules.map((v) => v.Name).join(", ")}`);
for (const v of builtinModules) require(v);

info("Running initial tools");
for (const v of peek(tools)) initTool(v);

info("Creating plugin toolbar");
const toolbar = plugin.CreateToolbar("Ethereal");
const button = toolbar.CreateButton(
	"ethereal",
	"Full-featured Eternal Towers of Hell companion plugin",
	assets.images.ethereal,
	"Launch Ethereal",
);

info("Creating app");
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
<folder scope={scope} Name="etherealNotifications" Parent={CoreGui}>
	<Notifications scope={scope} />
</folder>;

info("Startup finished!");
