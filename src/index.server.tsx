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
import Iris from "@rbxts/iris";
import { IS_DEV } from "constants";
import { createDebug } from "iris/debug";
import { Notifications } from "notifications";
import { plugin, Toolbar, ToolbarButton } from "plugin";
import { App } from "ui/app/app";
import { scope } from "ui/scoped";

const CoreGui = game.GetService("CoreGui");

plugin.Unloading.Once(() => {
	trace("Shutting down!");
	scope.doCleanup();
});

info("Creating plugin toolbar");
new Toolbar(scope, "Ethereal")
	.button(
		new ToolbarButton(
			scope,
			"Ethereal",
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
	.button(new ToolbarButton(scope, "Settings", "etherealSettings", "Configure Ethereal.", assets.icons.gear))
	.build();

info("Creating notifications");
scope.Hydrate(CoreGui)({
	[Children]: <Notifications scope={scope} />,
});

if (IS_DEV) {
	info("Creating debug window");
	Iris.Init(game.GetService("CoreGui"));
	scope.push(Iris.Connect(createDebug()), () => Iris.Shutdown());
}

info("Startup finished!");
