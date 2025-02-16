// From Ethereal, licensed under the GNU General Public License v3.0

import { Child, Children, UsedAs } from "@rbxts/fusion";

export interface LayoutProps {
	position?: UsedAs<UDim2>;
	anchorPoint?: UsedAs<Vector2>;
	size?: UsedAs<UDim2>;
	automaticSize?: UsedAs<Enum.AutomaticSize>;
}

export interface BaseProps {
	name?: UsedAs<string>;
	zIndex?: UsedAs<number>;
	layoutOrder?: UsedAs<number>;
}

export interface FlexProps {
	flexMode?: UsedAs<Enum.UIFlexMode>;
}

export interface ChildrenProps extends Record<typeof Children, Maybe<Child>> {}
