import { peek } from "@rbxts/fusion";
import helloWorld from "lib/coreExtensions/helloWorld";
import { extensions } from "lib/extensions";
import { debug } from "log";

export const CORE_EXTENSIONS = table.freeze([helloWorld]);

let pushedCoreExtensions = false;
export function pushCoreExtensions() {
	if (pushedCoreExtensions) return;
	pushedCoreExtensions = true;

	const extensionsNow = peek(extensions);
	for (const ext of CORE_EXTENSIONS) {
		debug("Pushing core extension named", ext.name);
		extensionsNow.add(ext);
	}

	extensions.set(extensionsNow);
}
