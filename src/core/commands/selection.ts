// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { EtPermissioned } from "@rbxts/et-for-plugins";
import { Selection } from "@rbxts/services";
import assets from "assets";
import { CoreCommandModule } from "core/types";

const PARTS = new Set<keyof CreatableInstances>([
	"Part",
	"WedgePart",
	"CornerWedgePart",
	"TrussPart",
	"MeshPart",
	"UnionOperation",
	"NegateOperation",
]);

const CONTAINERS = new Set<keyof CreatableInstances>(["Model", "Folder"]);

const EFFECTS = new Set<keyof CreatableInstances>(["ParticleEmitter", "Beam"]);

const LIGHTS = new Set<keyof CreatableInstances>(["SpotLight", "PointLight", "SurfaceLight"]);

const IMPLEMENT_PICK_CLASS_NAMES = new Set<keyof CreatableInstances>([...PARTS, ...CONTAINERS, ...EFFECTS, ...LIGHTS]);

export = {
	name: "Selection",
	icon: assets.images.et,
	run: (et: EtPermissioned) => {
		et.registerCommand({
			name: "Deselect all",
			description: "Deselect all",
			run: () => Selection.Set([]),
		});

		for (const className of IMPLEMENT_PICK_CLASS_NAMES) {
			et.registerCommand({
				name: `Pick selected ${className}s`,
				description: `Pick selected ${className}s`,
				run: () => Selection.Set(Selection.Get().filter((v) => classIs(v, className))),
			});
		}

		et.registerCommand({
			name: "Pick all selected parts",
			description: "Pick all selected parts",
			run: () => Selection.Set(Selection.Get().filter((v) => PARTS.has(v.ClassName as never))),
		});

		et.registerCommand({
			name: "Pick selected children",
			description: "Pick selected children",
			run: () =>
				Selection.Set(
					Selection.Get()
						.map((v) => v.GetChildren())
						.reduce((total, children) => {
							for (const v of children) total.push(v);
							return total;
						}),
				),
		});

		et.register({
			name: "Pick selected descendants",
			description: "Pick selected descendants",
			run: () =>
				Selection.Set(
					Selection.Get()
						.map((v) => v.GetDescendants())
						.reduce((total, children) => {
							for (const v of children) total.push(v);
							return total;
						}),
				),
		});
	},
} satisfies CoreCommandModule;
