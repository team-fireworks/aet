// Eternal is a full-featured companion plugin for Eternal Towers of Hell.
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

import { Child, Children, Hydrate, peek, Scope, UsedAs, Value } from "@rbxts/fusion";
import { Environment } from "@rbxts/ui-labs";

export const plugin = Environment.Plugin ?? script.FindFirstAncestorWhichIsA("Plugin")!;
// if (!plugin) throw "Ethereal must be run as a plugin.";

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
					ZIndexBehavior: Enum.ZIndexBehavior.Sibling,
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
