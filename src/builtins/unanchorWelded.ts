// From Ethereal, licensed under the GNU General Public License v3.0

import { createBuiltinTool } from "lib";

function deleteCoValues(parent: Instance, checkAgainst: Instance) {
	for (const child of parent.GetDescendants()) {
		if (child.Name === "ClientObject" && child !== checkAgainst) child.Destroy();
	}
}

createBuiltinTool({
	name: "unanchorWelded",
	label: "Unanchor Welded Parts",
	overview: "Unanchors all parts with Weld and WeldContraint.",
	description: "Unanchors all parts with Weld and WeldContraint.",

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
