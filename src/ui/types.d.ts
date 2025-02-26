// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

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
