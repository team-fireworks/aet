// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { warn } from "log";
import { Scoped } from "scoped";
import { Round as UpdatedRound } from "./constraints";

export interface RoundProps extends Scoped {
	radius?: UsedAs<UDim>;
}

/// @deprecated use components.constraints.Round
export function Round({ scope, radius = new UDim() }: RoundProps) {
	warn(`${debug.info(3, "s")[0]} needs to move to constraints.Round`);
	return <UpdatedRound scope={scope} radius={radius} />;
}
