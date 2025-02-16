// From Ethereal, licensed under the GNU General Public License v3.0

import { createBuiltinTool } from "lib";

function deleteCoValues(parent: Instance, checkAgainst: Instance) {
	for (const child of parent.GetDescendants()) {
		if (child.Name === "ClientObject" && child !== checkAgainst) child.Destroy();
	}
}

createBuiltinTool({
	name: "weld",
	label: "Weld",
	overview: "Welds selection to the selected base part.",
	description: "Welds selection to the selected base part.",

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
		ctx.onAction("Select Base", () => {});

		ctx.onAction("Weld", () => {});
	},
});
