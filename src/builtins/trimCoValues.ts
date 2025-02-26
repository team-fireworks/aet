// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Selection } from "@rbxts/services";
import { ETHEREAL_SOURCE, newTool } from "lib";

function deleteCoValues(parent: Instance, checkAgainst: Instance) {
	for (const child of parent.GetDescendants()) {
		if (child.Name === "ClientObject" && child !== checkAgainst) child.Destroy();
	}
}

newTool(ETHEREAL_SOURCE, {
	id: "trimCoValues",
	name: "Trim ClientObject Values",
	overview: "Deletes unnecessary ClientObject Values, which break old tower kits.",
	description: "Deletes unnecessary ClientObject Values, which break old tower kits.",

	init: (lib) => {
		lib.action({ label: "Trim All" }).onClick(() => {
			if (!lib.tower()) return;
			for (const descendant of lib.tower()!.coFolder.GetDescendants()) {
				if (!descendant.Parent || descendant.Name !== "ClientObject") continue;
				deleteCoValues(descendant.Parent!, descendant);
			}
		});

		lib.action({ label: "Trim Selection" }).onClick(() => {
			for (const descendant of Selection.Get()) {
				if (!descendant.Parent || descendant.Name !== "ClientObject") continue;
				deleteCoValues(descendant.Parent!, descendant);
			}
		});
	},
});
