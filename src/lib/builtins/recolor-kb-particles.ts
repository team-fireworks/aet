// From Ethereal, licensed under the GNU General Public License v3.0

import { Methods, registerTool, ROOT_SOURCE } from "lib/api";
import { trace, warn } from "log";

const TAGS = new Set(["kills", "ouch", "instakills", "poisons", "double"]);

registerTool({
	id: "recolorKbParticles",
	name: "Recolor Kill Brick Particles",
	description: "Colors all ParticleEmitters inside kill bricks to the kill brick's color.",
	tags: [],

	source: ROOT_SOURCE,

	methods: new Map([
		[
			Methods.Default,
			(ctx) => {
				if (!ctx.coFolder) return;

				for (const v of ctx.coFolder.GetDescendants()) {
					trace(`Checking ${v}`);

					if (!v.IsA("BasePart")) continue;

					let hasTag = false;
					print(v.GetChildren());
					for (const t of TAGS) {
						if (v.FindFirstChild(t)) {
							hasTag = true;
							break;
						}
					}

					if (!hasTag) continue;

					for (const c of v.GetChildren()) {
						warn(c);
						if (classIs(c, "ParticleEmitter")) c.Color = new ColorSequence(v.Color);
					}
				}
			},
		],
	]),
});
