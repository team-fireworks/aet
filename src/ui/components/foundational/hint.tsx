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

import type { UsedAs } from "@rbxts/fusion";
import Fusion, { Child, peek } from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import { RunService } from "@rbxts/services";
import { scope, Scoped } from "scoped";
import { theme } from "ui/theme";
import { Show } from "../fusion";
import { Muted } from "./muted";
import { Padding } from "./padding";
import { Paragraph } from "./paragraph";
import { Round } from "./round";

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
