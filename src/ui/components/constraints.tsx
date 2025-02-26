// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { Scoped } from "scoped";

const ZERO_UDIM = new UDim();

export interface PaddingProps extends Scoped {
	padding?: UsedAs<UDim>;
	paddingX?: UsedAs<UDim>;
	paddingY?: UsedAs<UDim>;
	paddingLeft?: UsedAs<UDim>;
	paddingRight?: UsedAs<UDim>;
	paddingTop?: UsedAs<UDim>;
	paddingBottom?: UsedAs<UDim>;
}

export function Padding({
	scope,
	padding,
	paddingX,
	paddingY,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,
}: PaddingProps) {
	return (
		<uipadding
			scope={scope}
			Name="Padding"
			PaddingLeft={scope.Computed((use) => use(paddingLeft) ?? use(paddingX) ?? use(padding) ?? ZERO_UDIM)}
			PaddingRight={scope.Computed((use) => use(paddingRight) ?? use(paddingX) ?? use(padding) ?? ZERO_UDIM)}
			PaddingTop={scope.Computed((use) => use(paddingTop) ?? use(paddingY) ?? use(padding) ?? ZERO_UDIM)}
			PaddingBottom={scope.Computed((use) => use(paddingBottom) ?? use(paddingY) ?? use(padding) ?? ZERO_UDIM)}
		/>
	);
}

export interface ListProps extends Scoped {
	direction: UsedAs<Enum.FillDirection>;
	alignX?: UsedAs<Enum.HorizontalAlignment>;
	alignY?: UsedAs<Enum.VerticalAlignment>;
	flexX?: UsedAs<Enum.UIFlexAlignment>;
	flexY?: UsedAs<Enum.UIFlexAlignment>;
	sort?: UsedAs<Enum.SortOrder>;
	padding?: UsedAs<UDim>;
}

export function List({
	scope,
	direction,
	alignX = Enum.HorizontalAlignment.Left,
	alignY = Enum.VerticalAlignment.Top,
	flexX,
	flexY,
	sort = Enum.SortOrder.LayoutOrder,
	padding,
}: ListProps) {
	return (
		<uilistlayout
			scope={scope}
			Name="List"
			FillDirection={direction}
			HorizontalAlignment={alignX}
			VerticalAlignment={alignY}
			HorizontalFlex={flexX}
			VerticalFlex={flexY}
			SortOrder={sort}
			Padding={padding}
		/>
	);
}

export interface RoundProps extends Scoped {
	radius?: UsedAs<UDim>;
}

export function Round({ scope, radius = new UDim() }: RoundProps) {
	return <uicorner scope={scope} Name="Round" CornerRadius={radius} />;
}
