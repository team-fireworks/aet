// From Ethereal, licensed under the GNU General Public License v3.0

import Fusion, { UsedAs, Value } from "@rbxts/fusion";
import { sans } from "ui/fonts";
import type { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import { BaseProps, LayoutProps } from "ui/types";
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
