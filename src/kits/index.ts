import { TowerInstance } from "@rbxts/ethereal-for-plugins";
import assets from "assets";
import { etoh, Icon } from "ui/components/icons";
import { UserId } from "userids";
import { memoize } from "utils/memoize";

export interface Tag {
	label: string;
	hint?: string;
}

export interface TowerKit {
	name: string;
	creators: UserId[];
	thumbnail: string;
	overview: string;
	tags: Tag[];
	insert: () => Instance;
}

export interface Addon {
	name: string;
	creators: UserId[];
	thumbnail: string;
	overview: string;
	tags: Tag[];
	insert: (parent: TowerInstance) => Instance;
}

export interface Kit {
	name: string;
	icon: Icon;
	kits: TowerKit[];
	addons: Addon[];
}

export const TAGS = table.freeze({
	unsubmittable: {
		label: "Unsubmittable",
		hint: `Cannot be submitted to EToH`,
	},
	customCos: {
		label: "Has CCOs",
		hint: `Includes custom client objects`,
	},
} satisfies Record<string, Tag>);

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
		name: "Eternal Towers of Hell",
		icon: etoh,
		kits: [
			{
				name: "Eternal Towers of Hell v5.5",
				creators: [UserId.Gammattor],
				thumbnail: assets.thumbnails.etohv5_5,
				overview: "Standard tower kit that can be submitted to EToH",
				tags: [],
				insert: () => {
					const inserted = new Instance("Folder");

					const coFolder = getKitAsset("etoh", "v5.5", "ClientSidedObjects").Clone();
					const move = getKitAsset("etoh", "v5.5", "scripts", "Move").Clone();
					move.Parent = coFolder;
					coFolder.Parent = inserted;

					getKitAsset("etoh", "v5.5", "Obby").Clone().Parent = inserted;

					task.defer(() => {
						if (!inserted) return;
						enableScripts([move]);
					});

					return inserted;
				},
			},
		],
		addons: [
			{
				name: "Hollowcore",
				creators: [UserId.MasSpartan],
				thumbnail: assets.thumbnails.hollowcore,
				overview: "Free to use configurable CCOs",
				tags: [TAGS.customCos],
				insert: (parent) => {
					const hollowcore = getKitAsset("etoh", "hollowcore").Clone();
					hollowcore.Name = "Hollowcore CCOs";
					hollowcore.Parent = parent.ClientSidedObjects;
					return hollowcore;
				},
			},
		],
	},
];
