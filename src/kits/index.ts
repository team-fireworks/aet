import { memoize } from "utils/memoize";

export interface SingleKit {
	kind: "kit";
	name: string;
	insert: () => Instance;
}

export interface Kit {
	kind: "kits";
	name: string;
	kits: SingleKit[];
}

const getKitAsset = memoize((...pathComponents: string[]) => {
	let inst: Instance = script;
	for (const v of pathComponents) inst = inst.WaitForChild(v);
	return inst;
});

function enableScripts(instances: Instance[]) {
	for (const v of instances) {
		if (v.IsA("Script")) v.Enabled = true;
	}
}

export const KITS: Kit[] = [
	{
		kind: "kits",
		name: "Eternal Towers of Hell",
		kits: [
			{
				kind: "kit",
				name: "Eternal Towers of Hell Version 5.5",
				insert: () => {
					const inserted = new Instance("Folder");
					inserted.Name = "EToH v5.5";

					const coFolder = getKitAsset("etoh", "v5.5", "ClientSidedObjects").Clone();
					const move = getKitAsset("etoh", "v5.5", "scripts", "Move").Clone();
					move.Parent = coFolder;

					getKitAsset("etoh", "v5.5", "Obby").Clone().Parent = inserted;
					coFolder.Parent = inserted;

					task.defer(() => {
						if (!inserted) return;
						enableScripts([move]);
					});

					return inserted;
				},
			},
		],
	},
];
