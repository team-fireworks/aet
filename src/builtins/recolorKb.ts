// From Ethereal, licensed under the GNU General Public License v3.0

import { createBuiltinTool } from "lib";
import { warn } from "log";

const TAGS = new Set(["kills", "ouch", "instakills", "poisons", "double"]);

createBuiltinTool({
	name: "recolorKbParticles",
	label: "Recolor Kill Brick Particles",
	overview: "Colors all ParticleEmitters inside kill bricks to the kill brick's color.",
	description: "Colors all ParticleEmitters inside kill bricks to the kill brick's color.",

	needsTower: true,

	args: [
		{
			name: "onlyKbFolder",
			label: "Only KillBrick folder?",
			kind: "boolean",
			default: true,
		},
	],

	run: (ctx) => {
		ctx.onAction("Recolor All", () => {
			if (!ctx.coFolder) return;

			for (const v of ctx.coFolder.GetDescendants()) {
				if (!v.IsA("BasePart")) continue;

				let hasTag = false;
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
		});

		ctx.onAction("Recolor Selection", () => {
			if (!ctx.coFolder) return;

			for (const v of ctx.coFolder.GetDescendants()) {
				if (!v.IsA("BasePart")) continue;

				let hasTag = false;
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
		});

		ctx.onAction("Recolor KillBrick folder", () => {
			if (!ctx.coFolder) return;

			for (const v of ctx.coFolder.GetDescendants()) {
				if (!v.IsA("BasePart")) continue;

				let hasTag = false;
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
		});
	},
});
