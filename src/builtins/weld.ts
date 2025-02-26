// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { ETHEREAL_SOURCE, newTool } from "lib";

newTool(ETHEREAL_SOURCE, {
	id: "weld",
	name: "Weld",
	overview: "Welds parts to a base part.",
	description: "Welds parts to a base part.",

	init: (lib) => {
		lib.action({ label: "Select Base" }).onClick(() => {});

		lib.action({ label: "Select Targets" }).onClick(() => {});

		lib.action({ label: "Weld" }).onClick(() => {});
	},
});
