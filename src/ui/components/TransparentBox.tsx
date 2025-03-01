// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children, UsedAs, Value } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { BaseProps, ChildrenProps, LayoutProps } from "ui/types";

export interface TransparentBoxProps extends ScopeProps, BaseProps, LayoutProps, ChildrenProps {
	visible?: UsedAs<boolean>;
	outSize?: Value<Vector2>;
	onActivated?: () => void;
	onHoverStart?: () => void;
	onHoverEnd?: () => void;
	onPressStart?: () => void;
	onPressEnd?: () => void;
}

export function TransparentBox({
	scope,

	name,
	zIndex,
	layoutOrder,

	position,
	anchorPoint,
	size,
	automaticSize,

	[Children]: children,

	visible,
	outSize,
	onActivated,
	onHoverStart,
	onHoverEnd,
	onPressStart,
	onPressEnd,
}: TransparentBoxProps) {
	const hasInputs = (onActivated ?? onPressStart ?? onPressEnd) !== undefined;
	return hasInputs ? (
		<imagebutton
			scope={scope}
			BackgroundTransparency={1}
			Name={name ?? "TransparentBox (has inputs)"}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			Visible={visible}
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
			BackgroundTransparency={1}
			Name={name ?? "TransparentBox"}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			Visible={visible}
			Out:AbsoluteSize={outSize}
			OnEvent:MouseEnter={onHoverStart}
			OnEvent:MouseLeave={onHoverEnd}
		>
			{children}
		</frame>
	);
}
