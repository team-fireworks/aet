// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { EtherealPermissioned } from "@rbxts/et-for-plugins";
import { Selection, StudioService } from "@rbxts/services";
import assets from "assets";

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

export = (et: EtherealPermissioned) => {
	et.register({
		icon: assets.images.ethereal,
		name: "Deselect all",
		description: "Deselect all",
		run: () => Selection.Set([]),
	});

	for (const className of IMPLEMENT_PICK_CLASS_NAMES) {
		et.register({
			icon: (StudioService.GetClassIcon(className) as { Image: never }).Image as never,
			name: `Pick ${className}s from selection`,
			description: `Pick ${className}s from selection`,
			run: () => Selection.Set(Selection.Get().filter((v) => classIs(v, className))),
		});
	}

	et.register({
		icon: assets.images.ethereal,
		name: "Pick all parts from selection",
		description: "Pick all parts from selection",
		run: () => Selection.Set(Selection.Get().filter((v) => PARTS.has(v.ClassName as never))),
	});

	et.register({
		icon: assets.images.ethereal,
		name: "Pick children from selection",
		description: "Pick children from selection",
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
		icon: assets.images.ethereal,
		name: "Pick descendants from selection",
		description: "Pick descendants from selection",
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
};
