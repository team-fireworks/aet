// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

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
}: DividerProps) {
	throw "not yet implemented";
}
