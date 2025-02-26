// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children, deriveScope, peek, Value } from "@rbxts/fusion";
import { HttpService, RunService } from "@rbxts/services";
import { plugin } from "plugin";
import { Scope } from "scoped";
import { Padding } from "ui/components/padding";
import { Round } from "ui/components/round";
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

		const updateHue = () => {
			const mousePosition = this.widget.GetRelativeMousePosition();
			const magnitude = mousePosition.sub(peek(hueAbsolutePosition));
			hue.set(math.clamp(magnitude.X / peek(hueAbsoluteSize).X, 0, 1));
		};

		const hueDragged = this.scope.Value(false);
		this.scope.push(
			RunService.PreRender.Connect(() => {
				if (peek(hueDragged)) updateHue();
			}),
		);

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
						AutoButtonColor={false}
						Size={new UDim2(1, 0, 0, 12)}
						Name="Hue"
						Out:AbsolutePosition={hueAbsolutePosition}
						Out:AbsoluteSize={hueAbsoluteSize}
						OnEvent:Activated={updateHue}
						OnEvent:MouseButton1Down={() => hueDragged.set(true)}
						OnEvent:MouseButton1Up={() => hueDragged.set(false)}
					>
						<uigradient scope={this.scope} Color={RAINBOW} />
						<uistroke scope={this.scope} Color={theme(this.scope, "border")} />
						<Round scope={this.scope} radius={new UDim(0, 6)} />
						<frame
							scope={this.scope}
							AnchorPoint={new Vector2(0.5, 0.5)}
							Name="Handle"
							Size={new UDim2(0, 8, 0, 8)}
							SizeConstraint={Enum.SizeConstraint.RelativeYY}
							Position={this.scope.Computed((use) => UDim2.fromScale(use(hue), 0.5))}
							// color needs to be computed before position
							BackgroundColor3={this.scope.Computed((use) => Color3.fromHSV(use(hue), 1, 1))}
						>
							<Round scope={this.scope} radius={new UDim(1, 0)} />
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
