import { peek } from "@rbxts/fusion";
import clientObjects from "core-extensions/client-objects";
import modelling from "core-extensions/modelling";
import selection from "core-extensions/selection";
import workspace from "core-extensions/workspace";
import { extensions } from "lib/extensions";
import { debug } from "log";

export const CORE_EXTENSIONS = table.freeze([clientObjects, modelling, selection, workspace]);

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
