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
import { Scoped } from "scoped";

export interface PaddingProps extends Scoped {
	padding?: UsedAs<UDim>;
	paddingX?: UsedAs<UDim>;
	paddingY?: UsedAs<UDim>;
	paddingLeft?: UsedAs<UDim>;
	paddingRight?: UsedAs<UDim>;
	paddingTop?: UsedAs<UDim>;
	paddingBottom?: UsedAs<UDim>;
}

const ZERO_UDIM = new UDim();

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
