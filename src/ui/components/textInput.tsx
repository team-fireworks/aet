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

import Fusion, { peek, UsedAs, Value } from "@rbxts/fusion";
import type { Scoped } from "scoped";
import { Padding, PaddingProps } from "ui/components/padding";
import { tween, useMotion } from "ui/ripple";
import { theme } from "ui/theme";
import type { BaseProps, FlexProps, LayoutProps } from "ui/types";
import { Muted } from "./muted";
import { Paragraph } from "./paragraph";
import { Round } from "./round";

export interface TextInputProps extends BaseProps, LayoutProps, Scoped, PaddingProps, FlexProps {
	placeholder?: UsedAs<string>;
	value: Value<string>;
}

export function TextInput({
	scope,
	position,
	anchorPoint,
	size,
	automaticSize = Enum.AutomaticSize.XY,
	name,
	zIndex,
	layoutOrder,
	flexMode = Enum.UIFlexMode.None,

	placeholder,
	value,

	padding,
	paddingX = new UDim(0, 2),
	paddingY = new UDim(0, 4),
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,
}: TextInputProps) {
	const isEmpty = scope.Computed((use) => use(value) === "");

	const [shift, shiftMotion] = useMotion(scope, 0);
	scope.Observer(isEmpty).onBind(() => shiftMotion.tween(peek(isEmpty) ? 0 : 1, tween(0.2)));

	const hover = scope.Value(false);
	const focus = scope.Value(false);

	const focusStrokeProgress = scope.Spring(
		scope.Computed((use) => (use(focus) ? 1 : 0)),
		30,
		1,
	);

	return (
		<textbox
			scope={scope}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			Name={name ?? "TextInput"}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			BackgroundColor3={scope.Spring(
				scope.Computed(
					(use, scope): Color3 => use(theme(scope, use(hover) || use(focus) ? "bgLighter" : "bgDarker")),
				),
				30,
				1,
			)}
			TextTransparency={1}
			Text={value}
			TextSize={0}
			Out:Text={value}
			OnEvent:MouseEnter={() => hover.set(true)}
			OnEvent:MouseLeave={() => hover.set(false)}
			OnEvent:Focused={() => focus.set(true)}
			OnEvent:FocusLost={() => focus.set(false)}
		>
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
			<uiflexitem scope={scope} FlexMode={flexMode} />
			{/* <Padding
				scope={scope}
				padding={padding}
				paddingX={paddingX}
				paddingY={paddingY}
				paddingLeft={paddingLeft}
				paddingRight={paddingRight}
				paddingTop={paddingTop}
				paddingBottom={paddingBottom}
			/> */}
			<Round scope={scope} radius={new UDim(0, 4)} />
			<uistroke
				scope={scope}
				Color={theme(scope, "bgDarkest")}
				Thickness={1}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			/>
			{/* <frame
				scope={scope}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1, 1)}
				Visible={scope.Computed((use) => use(focusStrokeProgress) > 0.05)}
			>
				<Round scope={scope} radius={new UDim(0, 4)} />
				<uistroke
					scope={scope}
					Color={theme(scope, "fg")}
					Thickness={scope.Computed((use) => use(focusStrokeProgress) * 2)}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				/>
			</frame> */}
			<Muted
				scope={scope}
				text={placeholder ? scope.Computed((use) => `<i>${use(placeholder)}</i>`) : undefined}
				textTransparency={shift}
				anchorPoint={new Vector2(0, 0.5)}
				position={scope.Computed((use) => new UDim2(0, use(shift) * 8, 0.5, 0))}
				padding={new UDim()}
			/>
			<Paragraph
				scope={scope}
				anchorPoint={new Vector2(0, 0.5)}
				position={new UDim2(0, 0, 0.5, 0)}
				text={value}
				zIndex={2}
				padding={new UDim()}
			/>
		</textbox>
	);
}
