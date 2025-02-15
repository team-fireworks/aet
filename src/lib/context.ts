import { TowerInstance } from "./tower";

export interface ToolContextSetting<T> {
	unwrap(): T;
	unwrapOr<U>(defaultValue: U): T | U;
	assertNonNil(): ToolContextSetting<NonNullable<T>>;
	assertString(): ToolContextSetting<string>;
	assertNumber(): ToolContextSetting<number>;
	assertBoolean(): ToolContextSetting<boolean>;
	assertKeyCode(): ToolContextSetting<Enum.KeyCode>;
}

export interface ToolContext {
	tower?: TowerInstance;
	coFolder?: Instance;
	obby?: Instance;
	frame?: Instance;
	spawn?: BasePart;
	winpad?: BasePart;

	setting(name: string): ToolContextSetting<unknown>;

	iterFrameFloors: IterableFunction<LuaTuple<[currentFloor: number, instances: Instance[]]>>;
}

export interface CreateToolContextProps {
	tower?: TowerInstance;
}

export function createToolContext({ tower }: CreateToolContextProps): ToolContext {
	const coFolder = tower?.WaitForChild("ClientSidedObjects");
	const obby = tower?.WaitForChild("Obby");
	const frame = tower?.WaitForChild("Frame");
	const spawn = tower?.WaitForChild("SpawnLocation") as Maybe<BasePart>;
	const winpad = tower?.WaitForChild("Obby").WaitForChild("WinPad") as Maybe<BasePart>;

	const frameFloors = new Map<number, Instance[]>();

	// if (frame)
	// 	for (const v of frame.GetDescendants()) {
	// 		if (!v.Name.find("Floor%d")) continue;

	// 		const i = tonumber(v.Name.sub(1, 5))!;
	// 		trace(`PART: ${v.Name}, FLOOR: ${i}`);

	// 		let a: Instance[];
	// 		if (frameFloors.has(i)) a = frameFloors.get(i)!;
	// 		else {
	// 			a = [];
	// 			frameFloors.set(i, a);
	// 		}

	// 		a.push(v);
	// 	}

	return {
		tower,
		coFolder,
		obby,
		frame,
		spawn,
		winpad,

		setting(name) {
			throw "not yet implemented";
		},

		iterFrameFloors: (() => {
			throw "not yet implemented";
		}) as never,
	};
}
