// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Child, Children, UsedAs, Value } from "@rbxts/fusion";
import { HttpService } from "@rbxts/services";
import { Environment } from "@rbxts/ui-labs";
import { Connect, event, Fire } from "libs/event";
import { Scope, ScopeProps } from "scope";

export const plugin = script.FindFirstAncestorWhichIsA("Plugin") ?? Environment.Plugin;
if (!plugin) throw `Ethereal must be run as a plugin`;

export interface WidgetRenderProps extends ScopeProps {
	onClosed: Connect<[]>;
}

export interface WidgetConstructorProps {
	title: UsedAs<string>;
	info: DockWidgetPluginGuiInfo;
	render: (props: WidgetRenderProps) => Child;
}

export class Widget {
	private widget: Value<Maybe<DockWidgetPluginGui>>;
	readonly name: string;
	private closed: Fire<[]>;
	readonly visible: Value<boolean>;

	constructor(
		private scope: Scope,
		private props: WidgetConstructorProps,
	) {
		this.widget = scope.Value(undefined);
		this.name = `Ethereal-${HttpService.GenerateGUID(false)}`;
		this.visible = scope.Value(false);

		const [onClosed, closed] = event<[]>();
		this.closed = closed;

		// Spawn a thread because CreateDockWidgetPluginGui yields, which UI
		// Labs can't handle.
		scope.spawnThread(() => {
			const widget = plugin.CreateDockWidgetPluginGui(this.name, props.info);

			scope.Hydrate(widget)({
				Name: this.name,
				Title: props.title,
				Enabled: this.visible,
				ZIndexBehavior: Enum.ZIndexBehavior.Sibling,
				[Children]: props.render({ scope, onClosed }),
			});

			widget.BindToClose(closed);
			scope.push(closed);

			this.widget.set(widget);
		});
	}
}

// TODO: PersistentWidget
