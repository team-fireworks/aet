// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children } from "@rbxts/fusion";
import { UsedAs } from "@rbxts/fusion/out/Types";
import { Scoped } from "scoped";
import { theme } from "ui/theme";
import { BaseProps, ChildrenProps, FlexProps, LayoutProps } from "ui/types";
import { Padding, PaddingProps } from "./padding";
import { Round } from "./round";

export interface TransparentPaneProps extends Scoped, ChildrenProps, LayoutProps, BaseProps, FlexProps, PaddingProps {
	clipDescendants?: UsedAs<boolean>;
}

export function TransparentPane({
	scope,
	clipDescendants = true,

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
			ClipsDescendants={clipDescendants}
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
	clipDescendants?: UsedAs<boolean>;
	bg?: UsedAs<Color3>;
}

export function Pane({
	scope,
	clipDescendants = true,
	bg,

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
		<frame
			scope={scope}
			BackgroundColor3={bg ?? theme(scope, "bgLight")}
			ClipsDescendants={clipDescendants}
			AnchorPoint={anchorPoint}
			AutomaticSize={automaticSize}
			Position={position}
			Size={size}
			Name={name}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
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
		</frame>
	);
}
