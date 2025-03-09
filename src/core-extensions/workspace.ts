import { Selection } from "@rbxts/services";
import assets from "assets";
import { newCoreExtension } from "lib/extensions";
import { forgetSelectedTower, trySetTower } from "lib/tower";
import { warn } from "log";

const ext = newCoreExtension({ name: "Workspace", icon: assets.images.dosuno });

ext.newCommand({
	name: "Select as Workspace Tower",
	description: "Set selection as workspace tower",
	run: () => {
		const selectionNow = Selection.Get();
		if (selectionNow.size() === 0) return;
		const [setOk, setReason] = trySetTower(Selection.Get()[0]!);
		if (!setOk) {
			warn(`Failed to set tower: ${setReason}`);
		}
	},
});

ext.newCommand({
	name: "Forget Workspace Tower",
	description: "Forget current workspace tower",
	run: () => {
		forgetSelectedTower();
	},
});

export = ext;
