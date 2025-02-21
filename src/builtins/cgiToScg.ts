// Eternal is a full-featured companion plugin for Eternal Towers of Hell.
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

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
