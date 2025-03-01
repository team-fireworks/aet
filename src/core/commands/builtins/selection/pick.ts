import type { Command } from "@rbxts/ethereal-for-plugins";
import Object from "@rbxts/object-utils";
import { Selection } from "@rbxts/services";

const PARTS = new Set<keyof CreatableInstances>([
	"Part",
	"WedgePart",
	"CornerWedgePart",
	"TrussPart",
	"MeshPart",
	"UnionOperation",
	"NegateOperation",
]);

const PICK_CLASSES = new Set<keyof CreatableInstances>([
	...PARTS,
	// Containers
	"Model",
	"Folder",
	// Effects
	"ParticleEmitter",
	"Beam",
	// Lights
	"SpotLight",
	"PointLight",
	"SurfaceLight",
]);

export = <Command[]>[
	...Object.keys(PICK_CLASSES).map(
		(className): Command => ({
			name: `Pick ${className} from selection`,
			description: `Picks ${className} from selection`,
			run: (run) => Selection.Set(Selection.Get().filter((selected) => classIs(selected, className))),
		}),
	),
	{
		name: `Pick all parts from selection`,
		description: `Picks all ${Object.keys(PARTS).join(", ")} from selection`,
		run: (run) => Selection.Set(Selection.Get().filter(({ ClassName }) => PARTS.has(ClassName as never))),
	},
];
