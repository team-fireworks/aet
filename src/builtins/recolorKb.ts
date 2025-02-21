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

import { Selection } from "@rbxts/services";
import { ETHEREAL_SOURCE, newTool } from "lib";

const TAGS = new Set(["kills", "ouch", "instakills", "poisons", "double"]);

newTool(ETHEREAL_SOURCE, {
	id: "recolorKbParticles",
	name: "Recolor Kill Brick Particles",
	overview: "Colors all ParticleEmitters inside kill bricks to the kill brick's color.",
	description: "Colors all ParticleEmitters inside kill bricks to the kill brick's color.",

	needsTower: true,

	init: (lib) => {
		function recolor(instances: Instance[]) {
			for (const v of instances) {
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
					if (classIs(c, "ParticleEmitter")) c.Color = new ColorSequence(v.Color);
				}
			}
		}

		lib.action({ label: "Recolor All" }).onClick(() => {
			if (lib.tower()) recolor(lib.tower()!.coFolder.GetDescendants());
		});

		lib.action({ label: "Recolor Selection" }).onClick(() => {
			recolor(Selection.Get());
		});

		lib.action({ label: "Recolor KillBricks" }).onClick(() => {
			const kb = lib.tower()?.instance.FindFirstChild("KillBricks");
			if (kb) recolor(kb.GetDescendants());
		});
	},
});
