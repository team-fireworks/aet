// From Ethereal, licensed under the GNU General Public License v3.0

import Fusion, { UsedAs } from "@rbxts/fusion";
import type { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import { BaseProps, FlexProps, LayoutProps } from "ui/types";
import { Padding, PaddingProps } from "../foundational/padding";
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

export interface ToggleProps extends BaseProps, LayoutProps, Scoped, PaddingProps, FlexProps {
	toggled?: UsedAs<boolean>;
	onToggle?: () => void;
}

export function Toggle({
	scope,
	position,
	anchorPoint,
	size,
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
			AutomaticSize={Enum.AutomaticSize.XY}
			AnchorPoint={anchorPoint}
			AutoButtonColor={false}
			BackgroundColor3={scope.computedSpring((use, scope) => use(theme(scope, use(toggled) ? "primary" : "fg")))}
			Size={UDim2.fromOffset(32, 12)}
			Position={position}
			LayoutOrder={layoutOrder}
			OnEvent:Activated={onToggle}
			OnEvent:MouseEnter={() => {
				hover.set(true);
			}}
			OnEvent:MouseLeave={() => {
				hover.set(false);
			}}
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
