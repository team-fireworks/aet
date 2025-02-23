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

import Fusion, { Children, deriveScope, peek, Value } from "@rbxts/fusion";
import { HttpService } from "@rbxts/services";
import { plugin } from "plugin";
import { Scope } from "scoped";
import { Padding } from "ui/components/padding";
import { theme } from "ui/theme";

// 15 steps is reasonably accurate
const RAINBOW_STEPS = 15;

const RAINBOW_KEYPOINTS = [];
for (const i of $range(0, RAINBOW_STEPS)) {
	RAINBOW_KEYPOINTS.push(
		new ColorSequenceKeypoint((1 / RAINBOW_STEPS) * i, Color3.fromHSV((1 / RAINBOW_STEPS) * i, 1, 1)),
	);
}

const RAINBOW = new ColorSequence(RAINBOW_KEYPOINTS);

export class ColorPicker {
	private scope: Scope;
	readonly shown: Value<boolean>;
	readonly value: Value<Maybe<Color3>>;
	private widgetId: string;
	private widget: DockWidgetPluginGui;

	constructor(outerScope: Scope) {
		this.scope = deriveScope(outerScope);
		outerScope.push(this.scope);

		this.shown = this.scope.Value(false);
		this.value = this.scope.Value(undefined);

		this.widgetId = `etherealColorPicker(${HttpService.GenerateGUID(false)})`;

		this.widget = plugin.CreateDockWidgetPluginGui(
			this.widgetId,
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, false, false, 400, 300, 300, 225),
		);

		const hue = this.scope.Value(0);
		const hueAbsolutePosition = this.scope.Value(Vector2.zero);
		const hueAbsoluteSize = this.scope.Value(Vector2.zero);

		this.scope.Hydrate(this.widget)({
			Name: this.widgetId,
			Title: "Ethereal — Select Color",
			Enabled: this.shown,

			[Children]: (
				<frame scope={this.scope} Size={UDim2.fromScale(1, 1)} BackgroundColor3={theme(this.scope, "bg")}>
					<Padding scope={this.scope} padding={new UDim(0, 6)} />
					<uilistlayout scope={this.scope} />
					<frame scope={this.scope} BackgroundTransparency={1} Size={UDim2.fromScale(1, 0)}></frame>
					<imagebutton
						scope={this.scope}
						Size={new UDim2(1, 0, 0, 16)}
						Name="Hue"
						Out:AbsolutePosition={hueAbsolutePosition}
						Out:AbsoluteSize={hueAbsoluteSize}
						OnEvent:Activated={() => {
							const mousePosition = this.widget.GetRelativeMousePosition();
							const magnitude = mousePosition.sub(peek(hueAbsolutePosition));
							hue.set(magnitude.X / peek(hueAbsoluteSize).X);
						}}
					>
						<uigradient scope={this.scope} Color={RAINBOW} />
						<uistroke scope={this.scope} Color={theme(this.scope, "border")} />
						<frame
							scope={this.scope}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={this.scope.Computed((use) => Color3.fromHSV(use(hue), 1, 1))}
							Name="Handle"
							Size={new UDim2(0, 8, 1, 0)}
							Position={this.scope.Computed((use) => UDim2.fromScale(use(hue), 0.5))}
						>
							<uistroke scope={this.scope} Color={theme(this.scope, "border")} />
						</frame>
					</imagebutton>
				</frame>
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
}
