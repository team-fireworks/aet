import type { Command } from "@rbxts/ethereal-for-plugins";

export const selectChildren: Command = {
	name: "Select children",
	description: "Testing command",
	run: (run) => {
		print("Hello world, from Ethereal");
	},
};
