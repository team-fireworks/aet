// From Ethereal, licensed under the GNU General Public License v3.0

import Fusion, { UsedAs } from "@rbxts/fusion";
import type { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import { BaseProps, FlexProps, LayoutProps } from "ui/types";
import { Padding, PaddingProps } from "../foundational/padding";
import { Paragraph } from "./paragraph";
import { Round } from "./round";

export enum ButtonStyle {
	Primary,
	Secondary,
	Muted,
	Danger,
}

export enum ButtonSize {
	Small,
	Standard,
	Large,
}

export enum ButtonAlignX {
	Left,
	Center,
	Right,
}

export interface ButtonProps extends BaseProps, LayoutProps, Scoped, PaddingProps, FlexProps {
	label?: UsedAs<string>;
	style: UsedAs<ButtonStyle>;
	buttonSize?: UsedAs<ButtonSize>;

	alignX?: UsedAs<ButtonAlignX>;

	onClick?: (input: InputObject) => void;
}

export function Button({
	scope,
	position,
	anchorPoint,
	size,
	automaticSize = Enum.AutomaticSize.XY,
	name,
	zIndex,
	layoutOrder,
	flexMode = Enum.UIFlexMode.None,

	label,
	style,
	buttonSize = ButtonSize.Standard,
	alignX = ButtonAlignX.Left,
	onClick,

	padding,
	paddingX = new UDim(0, 6),
	paddingY = new UDim(0, 2),
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,
}: ButtonProps) {
	const hover = scope.Value(false);

	const defaultBg = scope.Computed((use, scope) => {
		switch (use(style)) {
			case ButtonStyle.Primary:
				return use(theme(scope, "buttonPrimaryBg"));
			case ButtonStyle.Secondary:
				return use(theme(scope, "bgLighter"));
			case ButtonStyle.Muted:
				return use(theme(scope, "bgLight"));
			case ButtonStyle.Danger:
				return use(theme(scope, "buttonDangerBg"));
		}
	});

	const hoverBg = scope.Computed((use, scope) => {
		switch (use(style)) {
			case ButtonStyle.Primary:
				return use(theme(scope, "buttonPrimaryHover"));
			case ButtonStyle.Secondary:
				return use(theme(scope, "bgLightest"));
			case ButtonStyle.Muted:
				return use(theme(scope, "bgLighter"));
			case ButtonStyle.Danger:
				return use(theme(scope, "buttonDangerHover"));
		}
	});

	const fg = scope.Spring(
		scope.Computed((use, scope) => {
			switch (use(style)) {
				case ButtonStyle.Primary:
					return use(theme(scope, "buttonPrimaryFg"));
				case ButtonStyle.Secondary:
					return use(theme(scope, "fg"));
				case ButtonStyle.Muted:
					return use(theme(scope, "fgDarker"));
				case ButtonStyle.Danger:
					return use(theme(scope, "buttonDangerFg"));
			}
		}),
		30,
		1,
	);

	const bg = scope.Spring(
		scope.Computed((use) => (use(hover) ? use(hoverBg) : use(defaultBg))),
		30,
		1,
	);

	return (
		<imagebutton
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.XY}
			AnchorPoint={anchorPoint}
			AutoButtonColor={false}
			BackgroundColor3={bg}
			Position={position}
			LayoutOrder={layoutOrder}
			OnEvent:Activated={onClick}
			OnEvent:MouseEnter={() => {
				hover.set(true);
			}}
			OnEvent:MouseLeave={() => {
				hover.set(false);
			}}
		>
			<uiflexitem scope={scope} FlexMode={flexMode} />
			<uilistlayout
				scope={scope}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				HorizontalAlignment={scope.Computed((use) => {
					switch (use(alignX)) {
						case ButtonAlignX.Left:
							return Enum.HorizontalAlignment.Left;
						case ButtonAlignX.Center:
							return Enum.HorizontalAlignment.Center;
						case ButtonAlignX.Right:
							return Enum.HorizontalAlignment.Right;
					}
				})}
			/>
			<uistroke scope={scope} Color={theme(scope, "border")} />
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
			<Round scope={scope} radius={new UDim(0, 4)} />
			<Paragraph scope={scope} text={label} textColor={fg} />
		</imagebutton>
	);
}
