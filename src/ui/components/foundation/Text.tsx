// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { peek, UsedAs, Value } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { sans } from "ui/fonts";
import { Palette, palette } from "ui/palette";
import { BaseProps, LayoutProps } from "ui/types";
import { Padding, PaddingProps } from "./Padding";

export enum TextStyle {
	Title,
	Subtitle,
	Text,
	Label,
}

export type TextAlignX = "left" | "center" | "right";
export type TextAlignY = "top" | "center" | "bottom";

export interface TextProps extends ScopeProps, LayoutProps, BaseProps, PaddingProps {
	text: UsedAs<string>;
	textStyle: UsedAs<TextStyle>;
	textWrapped?: UsedAs<boolean>;
	textAlignX?: UsedAs<TextAlignX>;
	textAlignY?: UsedAs<TextAlignY>;
	rich?: UsedAs<boolean>;
	outTextBounds?: Value<Vector2>;
}

// TODO: move these values to palette
export const TEXT_STYLE_PALLETE = table.freeze({
	[TextStyle.Title]: "fgLight",
	[TextStyle.Subtitle]: "fgDark",
	[TextStyle.Text]: "fg",
	[TextStyle.Label]: "fgDarker",
} satisfies Record<TextStyle, keyof Palette>);

export const TEXT_STYLE_SIZES = table.freeze({
	[TextStyle.Title]: 24,
	[TextStyle.Subtitle]: 18,
	[TextStyle.Text]: 16,
	[TextStyle.Label]: 12,
} satisfies Record<TextStyle, number>);

export const TEXT_STYLE_FONTS = table.freeze({
	[TextStyle.Title]: sans(Enum.FontWeight.Bold),
	[TextStyle.Subtitle]: sans(Enum.FontWeight.SemiBold),
	[TextStyle.Text]: sans(),
	[TextStyle.Label]: sans(Enum.FontWeight.Regular, Enum.FontStyle.Italic),
} satisfies Record<TextStyle, Font>);

export function Text({
	scope,

	position,
	anchorPoint,
	size,
	automaticSize = Enum.AutomaticSize.XY,

	name,
	zIndex,
	layoutOrder,

	padding,
	paddingX,
	paddingY,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,

	text,
	textStyle,
	textWrapped = true,
	textAlignX = "left",
	textAlignY = "top",
	rich = true,
	outTextBounds,
}: TextProps) {
	const hasPadding =
		(padding ?? paddingX ?? paddingY ?? paddingLeft ?? paddingRight ?? paddingTop ?? paddingBottom) !== undefined;
	return (
		<textlabel
			scope={scope}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			Name={name ?? text}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			BackgroundTransparency={1}
			FontFace={scope.Computed((use) => TEXT_STYLE_FONTS[use(textStyle)])}
			Text={text}
			TextColor3={scope.Computed((use, scope) => use(palette(scope, TEXT_STYLE_PALLETE[use(textStyle)])))}
			TextSize={scope.Computed((use) => TEXT_STYLE_SIZES[use(textStyle)])}
			TextWrapped={textWrapped}
			TextXAlignment={scope.Computed((use) => {
				switch (use(textAlignX)) {
					case "left":
						return Enum.TextXAlignment.Left;
					case "center":
						return Enum.TextXAlignment.Center;
					case "right":
						return Enum.TextXAlignment.Right;
					default:
						throw `unknown Text.textAlignX: ${peek(textAlignX)}`;
				}
			})}
			TextYAlignment={scope.Computed((use) => {
				switch (use(textAlignY)) {
					case "top":
						return Enum.TextYAlignment.Top;
					case "center":
						return Enum.TextYAlignment.Center;
					case "bottom":
						return Enum.TextYAlignment.Bottom;
					default:
						throw `unknown Text.textAlignY: ${peek(textAlignY)}`;
				}
			})}
			RichText={rich}
			Out:TextBounds={outTextBounds}
		>
			{hasPadding ? (
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
			) : (
				[]
			)}
		</textlabel>
	);
}
