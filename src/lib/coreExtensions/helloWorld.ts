import assets from "assets";
import { newCoreExtension } from "lib/extensions";

const ext = newCoreExtension({ name: "Hello World", icon: assets.images.et });

ext.newCommand({
	name: "Hello World",
	description: "Prints 'Hello World'",
	run: (ctx) => {
		print("Hello World");
	},
});

export = ext;
