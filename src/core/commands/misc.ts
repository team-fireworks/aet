// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { EtherealPermissioned } from "@rbxts/et-for-plugins";
import assets from "assets";

export = (et: EtherealPermissioned) => {
	et.register({
		icon: assets.images.ethereal,
		name: "Hello Et",
		description: "Hello Et",
		run: (run) => {
			print("Hello Et!");
		},
	});
};
