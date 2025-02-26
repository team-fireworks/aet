// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import assets, { icons } from "assets";
import { Scoped } from "scoped";
import { theme } from "ui/theme";
import type { BaseProps, LayoutProps } from "ui/types";

export interface Icon {
	asset: string;
	name: string;
	aspectRatio: number;
}

export const fontAwesome = Object.fromEntries(
	Object.entries(icons).map(
		([name, asset]) => [name, { asset, name, aspectRatio: 1 }] satisfies [name: string, Icon],
	),
);

export const etoh: Icon = {
	asset: assets.images.etoh,
	name: "Eternal Towers of Hell",
	aspectRatio: 1726 / 835,
};

export const ethereal: Icon = {
	asset: assets.images.ethereal,
	name: "Ethereal",
	aspectRatio: 1,
};

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
			<uiaspectratioconstraint
				scope={scope}
				AspectRatio={scope.Computed((use) => use(icon).aspectRatio)}
				AspectType={Enum.AspectType.ScaleWithParentSize}
			/>
		</imagelabel>
	);
}
