// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import { Scoped } from "scoped";

export interface PopupProps extends Scoped {}

export function Popup({ scope }: PopupProps) {
	return <frame scope={scope}></frame>;
}
