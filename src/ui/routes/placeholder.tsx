// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import { Scoped } from "scoped";
import { Paragraph } from "ui/components/paragraph";

export function Placeholder({ scope }: Scoped) {
	return <Paragraph scope={scope} text="Placeholder (soon:tm:)" />;
}
