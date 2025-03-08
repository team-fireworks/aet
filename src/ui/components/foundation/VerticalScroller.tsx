// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children, Value } from "@rbxts/fusion";
import { UsedAs } from "@rbxts/fusion/out/Types";
import { ScopeProps } from "scope";
import { palette } from "ui/palette";
import { BaseProps, ChildrenProps, LayoutProps } from "ui/types";

export interface VerticalScrollerProps extends ScopeProps, BaseProps, LayoutProps, ChildrenProps {
	clipsDescendants?: UsedAs<boolean>;

	bg?: UsedAs<Color3>;

	outSize?: Value<Vector2>;
	onActivated?: () => void;
	onHoverStart?: () => void;
	onHoverEnd?: () => void;
	onPressStart?: () => void;
	onPressEnd?: () => void;
}

export function VerticalScroller({
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
}: VerticalScrollerProps) {
	return (
		<scrollingframe
			scope={scope}
			Name={name ?? "VerticalScroller"}
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
		</scrollingframe>
	);
}
