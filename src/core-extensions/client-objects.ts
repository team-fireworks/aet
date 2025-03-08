import assets from "assets";
import { newCoreExtension } from "lib/extensions";

const ext = newCoreExtension({ name: "Client Objects", icon: assets.images.fluent.magicWand });

// ext.newCommand({
// 	name: "Hello World",
// 	description: "Prints 'Hello World'",
// 	run: (ctx) => {
// 		print("Hello World");
// 	},
// });

export = ext;
