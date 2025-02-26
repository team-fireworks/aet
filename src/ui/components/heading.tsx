// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs, Value } from "@rbxts/fusion";
import type { Scoped } from "scoped";
import { Padding, PaddingProps } from "ui/components/padding";
import { sans } from "ui/fonts";
import { theme } from "ui/theme";
import type { BaseProps, LayoutProps } from "ui/types";

export enum TextAlignX {
	Left,
	Center,
	Right,
}

export enum TextAlignY {
	Top,
	Center,
	Bottom,
}

export interface HeadingProps extends BaseProps, LayoutProps, Scoped, PaddingProps {
	text?: UsedAs<string>;
	textColor?: UsedAs<Color3>;
	textTransparency?: UsedAs<number>;
	rich?: UsedAs<boolean>;

	// TODO implement
	outTextBounds?: Value<Vector2>;

	alignX?: UsedAs<TextAlignX>;
	alignY?: UsedAs<TextAlignY>;
}

export function Heading({
	scope,
	position,
	anchorPoint,
	size,
	automaticSize = Enum.AutomaticSize.XY,
	name,
	zIndex,
	layoutOrder,

	text,
	textColor,
	textTransparency,
	rich = true,
	outTextBounds,
	alignX = TextAlignX.Left,
	alignY = TextAlignY.Top,

	padding = new UDim(0, 2),
	paddingX,
	paddingY,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,
}: HeadingProps) {
	return (
		<textlabel
			BackgroundTransparency={1}
			scope={scope}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			Name={name ?? text ?? "Heading"}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			FontFace={sans(Enum.FontWeight.Bold)}
			Text={text}
			TextColor3={textColor ?? theme(scope, "fg")}
			TextSize={26}
			TextTransparency={textTransparency}
			TextXAlignment={scope.Computed((use) => {
				switch (use(alignX)) {
					case TextAlignX.Left:
						return Enum.TextXAlignment.Left;
					case TextAlignX.Center:
						return Enum.TextXAlignment.Center;
					case TextAlignX.Right:
						return Enum.TextXAlignment.Right;
					default:
						throw `unknown Heading.alignX: ${use(alignX)}`;
				}
			})}
			TextYAlignment={scope.Computed((use) => {
				switch (use(alignY)) {
					case TextAlignY.Top:
						return Enum.TextYAlignment.Top;
					case TextAlignY.Center:
						return Enum.TextYAlignment.Center;
					case TextAlignY.Bottom:
						return Enum.TextYAlignment.Bottom;
					default:
						throw `unknown Heading.alignY: ${use(alignX)}`;
				}
			})}
			Out:TextBounds={outTextBounds}
			RichText={rich}
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
		</textlabel>
	);
}
