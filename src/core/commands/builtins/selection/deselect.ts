import { Command } from "@rbxts/ethereal-for-plugins";
import { Selection } from "@rbxts/services";

export = <Command[]>[
	{
		name: `Deselect`,
		description: `Deselect all`,
		run: (run) => Selection.Set([]),
	},
];
