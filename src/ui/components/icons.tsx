// From Ethereal, licensed under the GNU General Public License v3.0

import Fusion, { UsedAs } from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import { icons } from "assets";
import { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import { BaseProps, LayoutProps } from "ui/types";

export interface Icon {
	asset: string;
	name: string;
}

export const fontAwesome = Object.fromEntries(
	Object.entries(icons).map(([name, asset]) => [name, { asset, name }] satisfies [name: string, Icon]),
);

export interface IconProps extends Scoped, BaseProps, LayoutProps {
	icon: UsedAs<Icon>;
	iconColor?: UsedAs<Color3>;
	iconTransparency?: UsedAs<number>;
	iconRotation?: UsedAs<number>;
}

export function Icon({
	scope,
	anchorPoint,
	automaticSize = Enum.AutomaticSize.XY,
	layoutOrder,
	position,
	size,
	zIndex,
	name,
	icon,
	iconColor,
	iconTransparency,
	iconRotation,
}: IconProps) {
	return (
		<imagelabel
			scope={scope}
			AnchorPoint={anchorPoint}
			AutomaticSize={automaticSize}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			LayoutOrder={layoutOrder}
			Position={position}
			Size={size}
			ZIndex={zIndex}
			Image={scope.Computed((use) => use(icon).asset)}
			ImageColor3={iconColor ?? theme(scope, "fg")}
			ImageTransparency={iconTransparency}
			Name={name ?? scope.Computed((use) => `Icon(${use(icon).name})`)}
			Rotation={iconRotation}
		>
			<uiaspectratioconstraint scope={scope} AspectRatio={1} />
		</imagelabel>
	);
}
