// Eternal is a full-featured companion plugin for Eternal Towers of Hell
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

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
import { CoreGui } from "@rbxts/services";
import { initTool, tools } from "lib";
import { plugin } from "plugin";
import { scope } from "scoped";
import { App } from "ui/app/app";
import { HintGui } from "ui/components/foundational/hint";
import { Notifications } from "ui/notifications";

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
