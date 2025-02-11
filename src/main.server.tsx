const plugin = script.FindFirstAncestorWhichIsA("Plugin");
assert(plugin !== undefined, "ethereal must be installed as a plugin");

// ---

import Fusion, { Children, peek } from "@rbxts/fusion";
import { tools } from "tools/api";
import { App } from "ui/app";
import { scope } from "ui/scoped";

print("Preloading builtin tools");
for (const v of script.Parent!.WaitForChild("tools").WaitForChild("builtins").GetDescendants()) {
	if (!classIs(v, "ModuleScript")) continue;
	require(v);
}

print("Loaded tools:", tools.map(({ name }) => name).join(", "));

plugin.Unloading.Once(() => scope.doCleanup());

const toolbar = plugin.CreateToolbar("Ethereal");
const button = toolbar.CreateButton(
	"ethereal",
	"Building suite for Eternal Towers of Hell",
	"rbxassetid://12888236753",
	"Launch Ethereal",
);

const widgetInfo = new DockWidgetPluginGuiInfo(Enum.InitialDockState.Left, false, false, 250, 450, 300, 400);
const widget = plugin.CreateDockWidgetPluginGui("Ethereal", widgetInfo);

const isWidgetOpen = scope.Value(false);
scope.push(
	toolbar,
	button,
	widget,
	button.Click.Connect(() => isWidgetOpen.set(!peek(isWidgetOpen))),
);

scope.Hydrate(widget)({
	Name: "Ethereal",
	Title: "Ethereal",
	Enabled: isWidgetOpen,

	[Children]: <App scope={scope} />,
});

widget.BindToClose(() => isWidgetOpen.set(false));
