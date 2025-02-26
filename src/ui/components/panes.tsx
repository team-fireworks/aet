// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children } from "@rbxts/fusion";
import { Scoped } from "scoped";
import { theme } from "ui/theme";
import { BaseProps, ChildrenProps, FlexProps, LayoutProps } from "ui/types";
import { Padding, PaddingProps } from "./padding";
import { Round } from "./round";

export interface TransparentPaneProps extends Scoped, ChildrenProps, LayoutProps, BaseProps, FlexProps, PaddingProps {}

export function TransparentPane({
	scope,

	anchorPoint,
	automaticSize,
	position,
	size,
	name = "TransparentPane",
	zIndex,
	layoutOrder,
	flexMode,

	padding,
	paddingX,
	paddingY,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,

	[Children]: children,
}: TransparentPaneProps) {
	return (
		<frame
			scope={scope}
			BackgroundTransparency={1}
			AnchorPoint={anchorPoint}
			AutomaticSize={automaticSize}
			Position={position}
			Size={size}
			Name={name}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
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
			{children}
		</frame>
	);
}

export interface PaneProps extends Scoped, ChildrenProps, LayoutProps, BaseProps, FlexProps, PaddingProps {
	onClick?: () => void;
}

export function Pane({
	scope,
	onClick,

	anchorPoint,
	automaticSize = Enum.AutomaticSize.XY,
	position,
	size,
	name = "Pane",
	zIndex,
	layoutOrder,
	flexMode,

	padding = new UDim(0, 4),
	paddingX,
	paddingY,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,

	[Children]: children,
}: PaneProps) {
	const hover = scope.Value(false);
	return (
		<imagebutton
			scope={scope}
			AutoButtonColor={false}
			BackgroundColor3={scope.computedSpring((use, scope) =>
				use(use(hover) ? theme(scope, "bgLighter") : theme(scope, "bgLight")),
			)}
			AnchorPoint={anchorPoint}
			AutomaticSize={automaticSize}
			Position={position}
			Size={size}
			Name={name}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			OnEvent:Activated={onClick}
			OnEvent:MouseEnter={() => hover.set(true)}
			OnEvent:MouseLeave={() => hover.set(false)}
		>
			<Round scope={scope} radius={new UDim(0, 4)} />
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
			<uistroke scope={scope} Color={theme(scope, "border")} />
			<uiflexitem scope={scope} FlexMode={flexMode} />
			{children}
		</imagebutton>
	);
}
