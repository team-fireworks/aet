// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { EtPermissioned } from "@rbxts/et-for-plugins";
import { Selection } from "@rbxts/services";
import { forgetSelectedTower, trySetTower } from "core/tower";
import { warn } from "log";

export = (et: EtPermissioned) => {
	et.register({
		name: "Set first selection as default tower",
		description: "Set the first selection as the default tower, which will be remembered in future sessions.",
		run: (run) => {
			const selection = Selection.Get();
			if (selection.size() === 1) {
				const [ok, reason] = trySetTower(selection[0]!);
				if (!ok) warn(`Failed to set default tower: ${reason}`);
			}
		},
	});

	et.register({
		name: "Forget default tower",
		description: "Forgets the default tower.",
		run: (run) => {
			forgetSelectedTower();
		},
	});
};
