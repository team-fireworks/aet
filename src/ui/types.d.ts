import { Child, Children, UsedAs } from "@rbxts/fusion";

export interface ChildrenProps {
	[Children]?: Child;
}

export interface BaseProps {
	name?: UsedAs<string>;
	zIndex?: UsedAs<number>;
	layoutOrder?: UsedAs<number>;
}

export interface FlexProps {
	flexMode?: UsedAs<Enum.UIFlexMode>;
}

export interface LayoutProps {
	position?: UsedAs<UDim2>;
	anchorPoint?: UsedAs<Vector2>;
	size?: UsedAs<UDim2>;
	automaticSize?: UsedAs<Enum.AutomaticSize>;
}
