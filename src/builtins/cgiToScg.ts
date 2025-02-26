// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Object from "@rbxts/object-utils";
import { Selection } from "@rbxts/services";
import { ETHEREAL_SOURCE, newTool } from "lib";

const COLLISION_GROUP_TO_ID = {
	Default: 0,
	Player: 1,
	OtherPlayers: 2,
	OnlyCollideWithPlayers: 3,
	DoNotCollideWithPlayers: 4,
	DoNotCollideWithSelf: 5,
	OnlyCollideWithPlayers2: 6,
	NeverCollide: 7,
};

const ID_TO_COLLISION_GROUP = new Map(Object.entries(COLLISION_GROUP_TO_ID).map(([k, v]) => [v, k]));

newTool(ETHEREAL_SOURCE, {
	id: "cgiToScg",
	name: "CollisionGroupIds to SetCollisionGroup Values",
	overview: "Converts CollisionGroupIds to SetCollisionGroup StringValues.",
	description:
		"Converts parts with the deprecated CollisionGroupId property to a matching SetCollisionGroup StringValue.",

	init: (lib) => {
		const overwrite = lib.args.boolean({ label: "Overwrite existing SetCollisionGroup values?", default: false });

		function createSCG(value: keyof typeof COLLISION_GROUP_TO_ID) {
			const scg = new Instance("StringValue");
			scg.Name = "SetCollisionGroup";
			scg.Value = value;
			return scg;
		}

		function convert(instances: Instance[]) {
			for (const v of instances) {
				if (!v.IsA("BasePart")) continue;

				const thisId = (v as never as { CollisionGroupId: number }).CollisionGroupId;
				const existing = v.FindFirstChild("SetCollisionGroup");

				if (existing) {
					if (classIs(existing, "StringValue") && overwrite.now()) continue;
					existing.Destroy();
				}

				for (const [id] of pairs(ID_TO_COLLISION_GROUP)) {
					if (thisId !== id) continue;
					(v as never as { CollisionGroupId: number }).CollisionGroupId = 0;

					let breakLoop = false;
					switch (id) {
						case 2:
							v.CanCollide = false;
							breakLoop = true;
							break;
						case 3:
							createSCG("OnlyCollideWithPlayers").Parent = v;
							breakLoop = true;
							break;
						case 4:
							createSCG("DoNotCollideWithPlayers").Parent = v;
							breakLoop = true;
							break;
					}

					if (breakLoop) break;
				}
			}
		}

		lib.action({ label: "Convert All" }).onClick(() => {
			assert(lib.tower());
			convert(lib.tower()!.instance.GetDescendants());
		});

		lib.action({ label: "Convert Selection" }).onClick(() => convert(Selection.Get()));
	},
});
