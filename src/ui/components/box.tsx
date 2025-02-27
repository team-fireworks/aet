import Fusion, { Children, Value } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { BaseProps, ChildrenProps, LayoutProps } from "ui/types";

export interface BoxProps extends ScopeProps, BaseProps, LayoutProps, ChildrenProps {
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

	outSize,
	onActivated,
	onHoverStart,
	onHoverEnd,
	onPressStart,
	onPressEnd,
}: BoxProps) {
	const passthroughInputs = (onActivated ?? onPressStart ?? onPressEnd) !== undefined;
	return passthroughInputs ? (
		<frame scope={scope} Name="Box (passthrough inputs)"></frame>
	) : (
		<imagebutton scope={scope} Name="Box"></imagebutton>
	);
}
