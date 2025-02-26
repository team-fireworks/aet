// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import type { UsedAs } from "@rbxts/fusion";
import Fusion, { Child, peek } from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import { RunService } from "@rbxts/services";
import { scope, Scoped } from "scoped";
import { Show } from "ui/components/fusion";
import { Padding } from "ui/components/padding";
import { Paragraph } from "ui/components/paragraph";
import { Round } from "ui/components/round";
import { theme } from "ui/theme";
import { Muted } from "./muted";

interface Hint {
	text?: UsedAs<string>;
	visible?: UsedAs<boolean>;
}

const hints = scope.Value(new Set<Hint>());

interface HintGuiProps extends Scoped {
	widget: DockWidgetPluginGui;
}

export function HintGui({ scope, widget }: HintGuiProps) {
	const mousePosition = scope.Value(widget.GetRelativeMousePosition());
	scope.push(RunService.PreRender.Connect(() => mousePosition.set(widget.GetRelativeMousePosition())));

	return (
		<frame
			scope={scope}
			AnchorPoint={new Vector2(0, 1)}
			BackgroundTransparency={1}
			Position={scope.Computed((use) => UDim2.fromOffset(use(mousePosition).X, use(mousePosition).Y))}
			Name="HintGui"
			ZIndex={9999}
			Interactable={false}
		>
			<uilistlayout scope={scope} Padding={new UDim(0, 2)} />
			{scope.Computed((use, scope) => {
				return Object.entries(use(hints))
					.filter(([v]) => use(v.visible))
					.map(([v]) => (
						<frame
							scope={scope}
							AutomaticSize={Enum.AutomaticSize.XY}
							BackgroundColor3={theme(scope, "bg")}
							Name="Hint"
						>
							<uistroke scope={scope} Color={theme(scope, "border")} />
							<Padding scope={scope} padding={new UDim(0, 4)} />
							<Round scope={scope} radius={new UDim(0, 4)} />
							<Show
								scope={scope}
								when={scope.Computed((use) => use(v).text !== undefined)}
								children={(scope) => (
									<Muted
										scope={scope}
										text={scope.Computed((use) => use(use(v).text!))}
										textWrapped={false}
									/>
								)}
							/>
						</frame>
					));
			})}
		</frame>
	);
}

export interface HintContainerProps extends Scoped {
	children: Child;
	text?: UsedAs<string>;
}

export function HintContainer({ scope, children, text }: HintContainerProps) {
	const hover = scope.Value(false);

	const absolutePosition = scope.Value(Vector2.zero);

	const h = {
		text,
		visible: hover,
	};

	hints.set(peek(hints).add(h));

	scope.push(() => peek(hints).delete(h));

	return (
		<frame
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			OnEvent:MouseEnter={() => hover.set(true)}
			OnEvent:MouseLeave={() => hover.set(false)}
			Out:AbsolutePosition={absolutePosition}
			Name="HintContainer"
		>
			{children}
		</frame>
	);
}

export interface HintProps extends Scoped {
	position: UsedAs<UDim2>;
	text?: UsedAs<string>;
	visible?: UsedAs<boolean>;
}

export function Hint({ scope, position, text, visible }: HintProps) {
	return (
		<frame scope={scope} AutomaticSize={Enum.AutomaticSize.XY} Position={position} Visible={visible}>
			<Show
				scope={scope}
				when={scope.Computed((use) => use(text) !== undefined)}
				children={(scope) => <Paragraph scope={scope} text={text!} />}
			/>
		</frame>
	);
}
