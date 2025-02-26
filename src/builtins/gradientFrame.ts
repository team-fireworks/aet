// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { ETHEREAL_SOURCE, newTool } from "lib";

newTool(ETHEREAL_SOURCE, {
	id: "gradientFrame",
	name: "Color Gradient Frame",
	overview: "Create color gradient frames",
	description: "Colors a frame based on a gradient.",

	init: (lib) => {
		const gradientColor = lib.args.colorSequence({
			label: "Gradient Color:",
			default: new ColorSequence(new Color3(), new Color3(1, 1, 1)),
		});

		lib.action({ label: "Color Selected Frame" }).onClick(() => {});
	},
});
