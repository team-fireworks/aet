// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children, Value } from "@rbxts/fusion";
import { UsedAs } from "@rbxts/fusion/out/Types";
import { ScopeProps } from "scope";
import { palette } from "ui/palette";
import { BaseProps, ChildrenProps, LayoutProps } from "ui/types";

export interface BoxProps extends ScopeProps, BaseProps, LayoutProps, ChildrenProps {
	clipsDescendants?: UsedAs<boolean>;

	bg?: UsedAs<Color3>;

	outSize?: Value<Vector2>;
	onActivated?: () => void;
	onHoverStart?: () => void;
	onHoverEnd?: () => void;
	onPressStart?: () => void;
	onPressEnd?: () => void;
}

export function Box({
	scope,

	name,
	zIndex,
	layoutOrder,

	position,
	anchorPoint,
	size,
	automaticSize,

	[Children]: children,

	clipsDescendants = true,

	bg,

	outSize,
	onActivated,
	onHoverStart,
	onHoverEnd,
	onPressStart,
	onPressEnd,
}: BoxProps) {
	const hasInputs = (onActivated ?? onPressStart ?? onPressEnd) !== undefined;
	return hasInputs ? (
		<imagebutton
			scope={scope}
			Name={name ?? "Box (has inputs)"}
			AutoButtonColor={false}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			ClipsDescendants={clipsDescendants}
			BackgroundColor3={bg ?? palette(scope, "bg")}
			Out:AbsoluteSize={outSize}
			OnEvent:Activated={onActivated}
			OnEvent:MouseEnter={onHoverStart}
			OnEvent:MouseLeave={onHoverEnd}
			OnEvent:MouseButton1Down={onPressStart}
			OnEvent:MouseButton1Up={onPressEnd}
		>
			{children}
		</imagebutton>
	) : (
		<frame
			scope={scope}
			Name={name ?? "Box"}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			ClipsDescendants={clipsDescendants}
			BackgroundColor3={bg ?? palette(scope, "bg")}
			Out:AbsoluteSize={outSize}
			OnEvent:MouseEnter={onHoverStart}
			OnEvent:MouseLeave={onHoverEnd}
		>
			{children}
		</frame>
	);
}
