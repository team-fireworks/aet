// Eternal is a full-featured companion plugin for Eternal Towers of Hell
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

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
