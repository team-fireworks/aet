// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { TowerInstance } from "@rbxts/et-for-plugins";
import { ServerStorage } from "@rbxts/services";
import { scope } from "scope";

const DEFAULT_TOWER_INSTANCE_NAME = "Et Default Tower (delete to reset)";
const MINIMUM_REQUIRES_MET_TO_CLASSIFY = 3;

/// Checks if an instance is a tower. Assume it is not a tower at all if it
/// doesn't need three of the required:
///
/// - ClientSidedObjects folder
/// - Obby folder
/// - Frame folder
/// - SpawnLocation part
/// - WinPad inside Obby folder
export function isTower(inst: Instance): LuaTuple<[ok: false, reason: string] | [ok: true]> {
	let requirementsMet = 0;

	const coFolder = inst.FindFirstChild("ClientSidedObjects");
	if (coFolder) requirementsMet += 1;

	const obby = inst.FindFirstChild("Obby");
	if (obby) requirementsMet += 1;

	const frame = inst.FindFirstChild("Frame");
	if (frame) requirementsMet += 1;

	const spawn = inst.FindFirstChild("SpawnLocation");
	if (spawn && spawn.IsA("BasePart")) requirementsMet += 1;

	const winpad = obby?.FindFirstChild("WinPad");
	if (winpad && winpad.IsA("BasePart")) requirementsMet += 1;

	if (requirementsMet < MINIMUM_REQUIRES_MET_TO_CLASSIFY)
		return $tuple(false as false, "This is not a tower, Ethereal is for Eternal Towers of Hell towers.");

	if (!coFolder)
		return $tuple(
			false as false,
			"No ClientSidedObjects folder found. If you're building a purist tower, create an empty folder.",
		);

	if (!obby) return $tuple(false as false, "No Obby folder found.");

	if (!frame)
		return $tuple(
			false as false,
			"No Frame model found. If you're building a frameless tower, create an empty Model.",
		);

	if (!spawn) return $tuple(false as false, "No SpawnLocation found. Create one to mark the start of the tower.");
	if (!spawn.IsA("BasePart"))
		return $tuple(false as false, `Expected SpawnLocation to be a base part, got a ${spawn.ClassName}`);

	if (!winpad)
		return $tuple(false as false, "No WinPad inside Obby folder found. Create one to mark the end of the tower.");
	if (!winpad.IsA("BasePart"))
		return $tuple(false as false, `Expected WinPad to be a base part, got a ${winpad.ClassName}`);

	return $tuple(true as true);
}

function getDefaultTowerObjectValue(): ObjectValue {
	let existing = ServerStorage.FindFirstChild(DEFAULT_TOWER_INSTANCE_NAME);
	if (existing) {
		if (classIs(existing, "ObjectValue")) return existing;
		existing.Destroy();
	}

	existing = new Instance("ObjectValue");
	existing.Name = DEFAULT_TOWER_INSTANCE_NAME;
	existing.Parent = ServerStorage;

	return existing as ObjectValue;
}

export const selectedTower = scope.Value<Maybe<TowerInstance>>(undefined);

export function forgetSelectedTower() {
	selectedTower.set(undefined);
	getDefaultTowerObjectValue().Value = undefined;
}

export function trySetTower(inst: Instance): LuaTuple<[ok: false, reason: string] | [ok: true]> {
	const [ok, reason] = isTower(inst);
	if (!ok) return $tuple(false as false, reason);

	selectedTower.set(inst);
	getDefaultTowerObjectValue().Value = inst;

	scope.push(inst.Destroying.Connect(() => forgetSelectedTower()));

	return $tuple(true as true);
}
