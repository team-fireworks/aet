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
