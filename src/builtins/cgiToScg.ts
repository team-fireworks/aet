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

import { createBuiltinTool } from "lib";

function deleteCoValues(parent: Instance, checkAgainst: Instance) {
	for (const child of parent.GetDescendants()) {
		if (child.Name === "ClientObject" && child !== checkAgainst) child.Destroy();
	}
}

createBuiltinTool({
	name: "cgiToScg",
	label: "CollisionGroupIds to SetCollisionGroup Values",
	overview: "Converts CollisionGroupIds properties to a new SetCollisionGroup IntValue",
	description: "Converts CollisionGroupIds properties to a new SetCollisionGroup IntValue",

	args: [
		{
			name: "checkClass",
			label: "Check for BoolValues?",
			kind: "boolean",
			default: false,
		},
	],

	run: (ctx) => {
		ctx.onAction("Unanchor All", () => {});
		ctx.onAction("Unanchor Children", () => {});
		ctx.onAction("Unanchor Descendants", () => {});
	},
});
