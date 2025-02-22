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

import Fusion, { UsedAs } from "@rbxts/fusion";
import type { Scoped } from "scoped";
import { Padding, PaddingProps } from "ui/components/padding";
import { theme } from "ui/theme";
import type { BaseProps, FlexProps, LayoutProps } from "ui/types";
import { Round } from "./round";

export interface ToggleProps extends BaseProps, LayoutProps, Scoped, PaddingProps, FlexProps {
	toggled?: UsedAs<boolean>;
	onToggle?: () => void;
}

export function Toggle({
	scope,
	position,
	anchorPoint,
	size = UDim2.fromOffset(32, 12),
	automaticSize = Enum.AutomaticSize.XY,
	name,
	zIndex,
	layoutOrder,
	flexMode = Enum.UIFlexMode.None,

	toggled,
	onToggle,

	padding = new UDim(0, 2),
	paddingX,
	paddingY,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,
}: ToggleProps) {
	const hover = scope.Value(false);

	return (
		<imagebutton
			scope={scope}
			AutomaticSize={automaticSize}
			AnchorPoint={anchorPoint}
			AutoButtonColor={false}
			BackgroundColor3={scope.computedSpring((use, scope) => use(theme(scope, use(toggled) ? "primary" : "fg")))}
			Name={name ?? "Toggle"}
			Size={size}
			Position={position}
			LayoutOrder={layoutOrder}
			OnEvent:Activated={onToggle}
			OnEvent:MouseEnter={() => {
				hover.set(true);
			}}
			OnEvent:MouseLeave={() => {
				hover.set(false);
			}}
			ZIndex={zIndex}
		>
			<uiflexitem scope={scope} FlexMode={flexMode} />
			<uistroke scope={scope} Color={theme(scope, "border")} />
			<Round scope={scope} radius={new UDim(0, 6)} />
			<frame
				scope={scope}
				BackgroundColor3={theme(scope, "bg")}
				Size={UDim2.fromScale(1, 1)}
				SizeConstraint={Enum.SizeConstraint.RelativeYY}
				AnchorPoint={scope.computedSpring((use) => new Vector2(use(toggled) ? 1 : 0, 0))}
				Position={scope.computedSpring((use) => UDim2.fromScale(use(toggled) ? 1 : 0, 0))}
			>
				<Round scope={scope} radius={new UDim(0, 5)} />
			</frame>
			<Padding
				scope={scope}
				padding={padding}
				paddingX={paddingX}
				paddingY={paddingY}
				paddingLeft={paddingLeft}
				paddingRight={paddingRight}
				paddingTop={paddingTop}
				paddingBottom={paddingBottom}
			/>
		</imagebutton>
	);
}
