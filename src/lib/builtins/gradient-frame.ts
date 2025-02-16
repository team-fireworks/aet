// From Ethereal, licensed under the GNU General Public License v3.0

import { Methods, registerTool, ROOT_SOURCE } from "lib/api";

registerTool({
	id: "gradientFrame",
	name: "Gradient Frame",
	description: "Consolidates and seperate Attachment Particle Emitters into a single Part.",
	tags: [],

	source: ROOT_SOURCE,

	args: [
		{
			kind: "boolean",
			name: "toggleTest",
			label: "Testing woww",
			default: false,
		},
	],

	methods: new Map([
		[
			Methods.Default,
			(ctx) => {
				print(ctx.frame);
				print("i said gg eight times and i got banned. steam fix ur moderation");
			},
		],
	]),
});
