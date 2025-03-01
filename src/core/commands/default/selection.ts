import { EtherealPermissioned } from "@rbxts/ethereal-for-plugins";
import { Selection } from "@rbxts/services";
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

export = (et: EtherealPermissioned) => {
	et.register({
		icon: assets.images.ethereal,
		name: "Deselect all",
		description: "Deselect all",
		run: (run) => {
			Selection.Set([]);
		},
	});
};
