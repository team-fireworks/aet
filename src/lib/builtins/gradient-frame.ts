// From Ethereal, licenced under The 3-Clause BSD License.

import { Methods, registerTool, ROOT_SOURCE } from "lib/api";

registerTool({
	id: "gradientFrame",
	name: "Gradient Frame",
	description: "Consolidates and seperate Attachment Particle Emitters into a single Part.",
	tags: [],

	source: ROOT_SOURCE,

	methods: new Map([[Methods.Default, (ctx) => {}]]),
});
