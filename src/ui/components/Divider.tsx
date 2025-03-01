import { UsedAs } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { BaseProps, LayoutProps } from "ui/types";

export interface DividerProps extends ScopeProps, LayoutProps, BaseProps {
	color?: UsedAs<Color3>;
}

export function Divider({
	scope,
	position,
	anchorPoint,
	automaticSize,
	size,
	name,
	zIndex,
	layoutOrder,
}: DividerProps) {}
