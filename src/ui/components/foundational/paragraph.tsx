// Eternal is a full-featured companion plugin for Eternal Towers of Hell
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

import Fusion, { UsedAs, Value } from "@rbxts/fusion";
import type { Scoped } from "scoped";
import { sans } from "ui/fonts";
import { theme } from "ui/theme";
import type { BaseProps, LayoutProps } from "ui/types";
import { Padding, PaddingProps } from "../foundational/padding";

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

export interface ParagraphProps extends BaseProps, LayoutProps, Scoped, PaddingProps {
	text?: UsedAs<string>;
	textColor?: UsedAs<Color3>;
	textTransparency?: UsedAs<number>;
	textWrapped?: UsedAs<boolean>;
	rich?: UsedAs<boolean>;

	// TODO implement
	outTextBounds?: Value<Vector2>;

	alignX?: UsedAs<TextAlignX>;
	alignY?: UsedAs<TextAlignY>;
}

export function Paragraph({
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
	textWrapped = true,
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
}: ParagraphProps) {
	return (
		<textlabel
			BackgroundTransparency={1}
			scope={scope}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			Name={name ?? text ?? "Paragraph"}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			FontFace={sans()}
			Text={text}
			TextColor3={textColor ?? theme(scope, "fg")}
			TextSize={16}
			TextTransparency={textTransparency}
			TextWrapped={textWrapped}
			TextXAlignment={scope.Computed((use) => {
				switch (use(alignX)) {
					case TextAlignX.Left:
						return Enum.TextXAlignment.Left;
					case TextAlignX.Center:
						return Enum.TextXAlignment.Center;
					case TextAlignX.Right:
						return Enum.TextXAlignment.Right;
					default:
						throw `unknown Paragraph.alignX: ${use(alignX)}`;
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
						throw `unknown Paragraph.alignY: ${use(alignX)}`;
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
