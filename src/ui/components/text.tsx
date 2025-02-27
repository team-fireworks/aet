import Fusion, { peek, UsedAs, Value } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { sans } from "ui/fonts";
import { BaseProps, LayoutProps } from "ui/types";

export enum TextStyle {
	Title,
	Subtitle,
	Text,
	Label,
}

export type TextAlignX = "left" | "center" | "right";
export type TextAlignY = "top" | "center" | "bottom";

export interface TextProps extends ScopeProps, LayoutProps, BaseProps {
	text: UsedAs<string>;
	textStyle: UsedAs<TextStyle>;
	textWrapped?: UsedAs<boolean>;
	textAlignX?: UsedAs<TextAlignX>;
	textAlignY?: UsedAs<TextAlignY>;
	rich?: UsedAs<boolean>;
	outTextBounds?: Value<Vector2>;
}

const TEXT_STYLE_SIZES = table.freeze({
	[TextStyle.Title]: 24,
	[TextStyle.Subtitle]: 16,
	[TextStyle.Text]: 12,
	[TextStyle.Label]: 10,
} satisfies Record<TextStyle, number>);

const TEXT_STYLE_FONTS = table.freeze({
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

	text,
	textStyle,
	textWrapped = true,
	textAlignX = "left",
	textAlignY = "top",
	rich = true,
	outTextBounds,
}: TextProps) {
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
		></textlabel>
	);
}
