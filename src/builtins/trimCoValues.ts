// From Ethereal, licensed under the GNU General Public License v3.0

import { createBuiltinTool } from "lib";

function deleteCoValues(parent: Instance, checkAgainst: Instance) {
	for (const child of parent.GetDescendants()) {
		if (child.Name === "ClientObject" && child !== checkAgainst) child.Destroy();
	}
}

createBuiltinTool({
	name: "trimCoValues",
	label: "Trim ClientObject Values",
	overview: "Deletes unnecessary ClientObject Values, which break old tower kits.",
	description: "Deletes unnecessary ClientObject Values, which break old tower kits.",

	needsTower: true,

	args: [
		{
			name: "checkClass",
			label: "Check for BoolValues?",
			kind: "boolean",
			default: false,
		},
	],

	run: (ctx) => {
		ctx.onAction("Trim All", () => {
			if (!ctx.coFolder) return;
			for (const descendant of ctx.coFolder.GetDescendants()) {
				if (!descendant.Parent || descendant.Name !== "ClientObject") continue;
				deleteCoValues(descendant.Parent!, descendant);
			}
		});

		ctx.onAction("Trim Selection", () => {
			if (!ctx.coFolder) return;
			for (const descendant of ctx.coFolder.GetDescendants()) {
				if (!descendant.Parent || descendant.Name !== "ClientObject") continue;
				deleteCoValues(descendant.Parent!, descendant);
			}
		});
	},
});
