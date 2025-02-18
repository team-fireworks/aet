// Eternal is a full-featured companion plugin for Eternal Towers of Hell
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

import Fusion, { UsedAs } from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import { icons } from "assets";
import { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import type { BaseProps, LayoutProps } from "ui/types";

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
