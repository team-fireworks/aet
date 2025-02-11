import { UsedAs } from "@rbxts/fusion";

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
