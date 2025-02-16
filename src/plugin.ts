// From Ethereal, licensed under the GNU General Public License v3.0

import { Child, Children, Hydrate, peek, Scope, UsedAs, Value } from "@rbxts/fusion";

export const plugin = script.FindFirstAncestorWhichIsA("Plugin")!;
if (!plugin) throw "Ethereal must be run as a plugin.";

interface Widget {
	title: UsedAs<string>;
	name: UsedAs<string>;
	info: DockWidgetPluginGuiInfo;
	child: Child;
}

export class ToolbarButton<S> {
	onClickCallbacks: Array<() => void>;
	widgets: Widget[];

	constructor(
		readonly scope: Scope<S>,
		readonly title: string,
		readonly name: string,
		readonly tooltip: string,
		readonly icon: string,
	) {
		this.onClickCallbacks = [];
		this.widgets = [];
	}

	widget(title: UsedAs<string>, name: UsedAs<string>, info: DockWidgetPluginGuiInfo, child: Child) {
		this.widgets.push({ title, name, info, child });
		return this;
	}

	build(toolbar: PluginToolbar) {
		const button = toolbar.CreateButton(this.name, this.tooltip, this.icon, this.title);
		this.scope.push(button);

		const isToggled = Value(this.scope, false);
		this.scope.push(
			button.Click.Connect(() => {
				isToggled.set(!peek(isToggled));
				for (const v of this.onClickCallbacks) {
					const thread = task.spawn(v);
					this.scope.push(() => task.cancel(thread));
				}
			}),
			this.widgets.map(({ title, name, info, child }) => {
				const widget = plugin.CreateDockWidgetPluginGui(peek(name), info);

				Hydrate(
					this.scope,
					widget,
				)({
					Title: title,
					Name: name,
					Enabled: isToggled,
					[Children]: child,
				});

				return widget;
			}),
		);
	}
}

export class Toolbar<S> {
	private buttons: ToolbarButton<S>[];

	constructor(
		readonly scope: Scope<S>,
		readonly name: string,
	) {
		this.buttons = [];
	}

	button(button: ToolbarButton<S>) {
		this.buttons.push(button);
		return this;
	}

	build() {
		const toolbar = plugin.CreateToolbar(this.name);
		this.scope.push(toolbar);

		for (const v of this.buttons) v.build(toolbar);
	}
}
