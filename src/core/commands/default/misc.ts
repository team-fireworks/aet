import { EtherealPermissioned } from "@rbxts/ethereal-for-plugins";
import assets from "assets";

export = (et: EtherealPermissioned) => {
	et.register({
		icon: assets.images.ethereal,
		name: "Hello Et",
		description: "Hello Et",
		run: (run) => {
			print("Hello Et!");
		},
	});
};
