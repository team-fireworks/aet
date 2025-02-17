// From Ethereal, licensed under the GNU General Public License v3.0

import { IS_DEV } from "constants";
import { createBuiltinTool } from "lib";
import { debug } from "log";

if (IS_DEV) {
	createBuiltinTool({
		name: "argTest",
		label: "Argument Testing",
		overview: "EToH Deletion 2025",
		description: "EToH Deletion 2025",

		args: [
			{
				name: "booleanArg",
				label: "Boolean argument",
				kind: "boolean",
				default: false,
			},
		],

		run: (ctx) => {
			ctx.onAction("Dump arguments", () => {
				debug(`booleanArg: ${ctx.arg("booleanArg").now()}`);
			});

			ctx.onAction("Assert arguments", () => {
				debug("Asserting booleanArg is boolean");
				ctx.arg("booleanArg").assertBoolean();
			});
		},
	});
}
