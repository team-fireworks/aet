import Fusion, { Children, innerScope, peek, Value } from "@rbxts/fusion";
import { HttpService } from "@rbxts/services";
import { plugin } from "plugin";
import { Scope } from "scoped";
import { theme } from "ui/theme";

export class ColorPicker {
	private scope: Scope;
	readonly shown: Value<boolean>;
	readonly value: Value<Maybe<Color3>>;
	private widgetId: string;
	private widget: DockWidgetPluginGui;

	constructor(outerScope: Scope) {
		this.scope = innerScope(outerScope);

		this.shown = this.scope.Value(false);
		this.value = this.scope.Value(undefined);

		this.widgetId = `etherealColorPicker_${HttpService.GenerateGUID()}`;

		print(plugin);

		const test = plugin.CreateDockWidgetPluginGui(
			this.widgetId,
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, false, false, 500, 250, 400, 200),
		);

		print(test);

		this.widget = test;

		this.scope.push(this.widget);

		print("ME OK");

		this.scope.Hydrate(this.widget)({
			Title: "Ethereal — Color Picker",
			Enabled: this.shown,

			[Children]: (
				<frame
					scope={this.scope}
					Size={UDim2.fromScale(1, 1)}
					BackgroundColor3={theme(this.scope, "bg")}
				></frame>
			),
		});

		function destroy() {
			print("CLEANING UP!!");
		}

		this.scope.push(destroy);
	}

	show() {
		this.shown.set(true);
	}

	close() {
		this.shown.set(false);
	}

	toggle(shown?: boolean) {
		this.shown.set(shown !== undefined ? shown : !peek(this.shown));
	}

	out() {}

	onChange() {}

	onClosed() {}
}
