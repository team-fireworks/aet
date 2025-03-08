// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { udimPx, udimScale } from "ui/udim";

export interface CornerProps extends ScopeProps {}

export function CornerSmall({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerSmall" CornerRadius={udimPx(4)} />;
}

export function CornerMid({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerMid" CornerRadius={udimPx(8)} />;
}

export function CornerLarge({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerLarge" CornerRadius={udimPx(12)} />;
}

export function CornerFull({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerFull" CornerRadius={udimScale(1)} />;
}
