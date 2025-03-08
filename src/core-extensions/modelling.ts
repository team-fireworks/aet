// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Selection } from "@rbxts/services";
import assets from "assets";
import { newCoreExtension } from "lib/extensions";

const ext = newCoreExtension({ name: "Modelling", icon: assets.images.fluent.straightRuler });

const STUDS = table.freeze({
	[1]: "stud",
	[0.5]: "half stud",
	[0.25]: "quarter stud",
	[0.1]: "tenth stud",
});

for (const [size, name] of pairs(STUDS)) {
	ext.newCommand({
		name: `Round selected part size to nearest ${name}`,
		description: `For each part selected, rounds the part's size to the nearest ${name}.`,
		run: () => {
			for (const selected of Selection.Get()) {
				if (!selected.IsA("BasePart")) continue;
				selected.Size = new Vector3(
					math.round(selected.Size.X / size) * size,
					math.round(selected.Size.Y / size) * size,
					math.round(selected.Size.Z / size) * size,
				);
			}
		},
	});

	ext.newCommand({
		name: `Round selected part position to nearest ${name}`,
		description: `For each part selected, rounds the part's position to the nearest ${name}.`,
		run: () => {
			for (const selected of Selection.Get()) {
				if (!selected.IsA("BasePart")) continue;
				selected.Position = new Vector3(
					math.round(selected.Position.X / size) * size,
					math.round(selected.Position.Y / size) * size,
					math.round(selected.Position.Z / size) * size,
				);
			}
		},
	});
}

export = ext;
