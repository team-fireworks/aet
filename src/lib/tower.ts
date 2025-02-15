import { ServerStorage, Workspace } from "@rbxts/services";
import { scope } from "ui/scoped";

export interface TowerObbyInstance extends Instance {
	WinPad: BasePart;
}

export interface TowerInstance extends Instance {
	ClientSidedObjects: Instance;
	Obby: TowerObbyInstance;
	Frame: Instance;
	SpawnLocation: BasePart;
}

const DEFAULT_TOWER_INSTANCE_NAME = "__ethereal_defaultTower";
const SERVICES = new Set(game.GetChildren());

// TODO: we need better error handling here
export function isTower(inst: Instance): LuaTuple<[isTower: boolean, reason: Maybe<string>]> {
	if (inst === Workspace) return $tuple(false, "Towers should not be unparented in the Workspace.");
	if (SERVICES.has(inst as never)) return $tuple(false, "Services are not a tower.");

	if (!inst.FindFirstChild("ClientSidedObjects"))
		return $tuple(
			false,
			"No ClientSidedObjects folder. If you're building a purist tower, create an empty folder.",
		);

	const obby = inst.FindFirstChild("Obby");
	if (!obby) return $tuple(false, "No Obby folder.");
	if (!inst.FindFirstChild("Frame"))
		return $tuple(false, "No Frame folder. If you're building a frameless tower, create an empty model.");

	if (!obby.FindFirstChild("WinPad")) return $tuple(false, "No WinPad inside Obby folder.");

	const spawn = inst.FindFirstChild("SpawnLocation");
	if (!spawn) return $tuple(false, "No SpawnLocation found. Create a new part to mark the start of the tower.");
	if (!spawn.IsA("BasePart"))
		return $tuple(false, `Expected SpawnLocation to be a base part, got a ${spawn.ClassName}`);

	return $tuple(true, undefined);
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

export function getDefaultTower(): Maybe<TowerInstance> {
	return getDefaultTowerObjectValue().Value as TowerInstance;
}

export function setDefaultTower(inst: Instance) {
	getDefaultTowerObjectValue().Value = inst;
}

export const selectedTower = scope.Value<Maybe<TowerInstance>>(getDefaultTower());
