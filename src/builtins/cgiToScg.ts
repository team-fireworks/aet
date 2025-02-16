// From Ethereal, licensed under the GNU General Public License v3.0

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
