// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Children, UsedAs } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { ChildrenProps } from "ui/types";

export interface CanvasProps extends ScopeProps, ChildrenProps {
	transparency?: UsedAs<number>;
}

export function Canvas({ scope, [Children]: children, transparency }: CanvasProps) {
	throw "not yet implemented";
}
