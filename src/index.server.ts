import { peek } from "@rbxts/fusion";
import assets from "assets";
import { plugin, Widget } from "plugin";
import { scope } from "scope";

plugin.Unloading.Once(() => scope.doCleanup());

const etherealToolbar = plugin.CreateToolbar("Ethereal");
const launchEthereal = etherealToolbar.CreateButton(
	"Ethereal",
	"Full-featured Eternal Towers of Hell companion plugin",
	assets.images.ethereal,
	"Ethereal",
);

const mainWidget = new Widget(scope, {
	title: "Ethereal",
	info: new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, true, false, 500, 250, 400, 200),
	render: ({ scope }) =>
		scope.New("TextLabel")({
			AutomaticSize: Enum.AutomaticSize.XY,
			Text: "WIP",
			TextSize: 24,
		}),
});

scope.push(
	etherealToolbar,
	launchEthereal,
	launchEthereal.Click.Connect(() => mainWidget.visible.set(!peek(mainWidget.visible))),
);
