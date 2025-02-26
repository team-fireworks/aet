// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

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
