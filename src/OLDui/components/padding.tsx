// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { warn } from "log";
import { Scoped } from "scoped";
import { Padding as UpdatedPadding } from "./constraints";

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

/// @deprecated use components.constraint.Padding
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
	warn(`${debug.info(3, "s")[0]} needs to move to constraints.Padding`);
	return (
		<UpdatedPadding
			scope={scope}
			padding={padding}
			paddingX={paddingX}
			paddingY={paddingY}
			paddingLeft={paddingLeft}
			paddingRight={paddingRight}
			paddingTop={paddingTop}
			paddingBottom={paddingBottom}
		/>
	);
}
