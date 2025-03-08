import { peek } from "@rbxts/fusion";
import helloWorld from "extensions/helloWorld";
import modelling from "extensions/modelling";
import selection from "extensions/selection";
import { extensions } from "lib/extensions";
import { debug } from "log";

export const CORE_EXTENSIONS = table.freeze([helloWorld, modelling, selection]);

let addedCoreExtensions = false;
export function addCoreExtensions() {
	if (addedCoreExtensions) return;
	addedCoreExtensions = true;

	const extensionsNow = peek(extensions);
	for (const ext of CORE_EXTENSIONS) {
		debug("Pushing core extension named", ext.name);
		extensionsNow.add(ext);
	}

	extensions.set(extensionsNow);
}
