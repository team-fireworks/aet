import { peek } from "@rbxts/fusion";
import SiftDictionary from "@rbxts/sift/out/Dictionary";
import { selectedTower } from "lib/tower";
import { plugin } from "plugin";
import { event } from "utils/event";
import { TowerInstance } from "./tower";
import { LibArgumentContext, LibRunContext, LibTool, LibToolSource, RunRequest } from "./types";

export * from "./tower";
export * from "./types";

type Cleanup = () => void;

export const ROOT_TOOL_SOURCE: LibToolSource = {
	name: "ethereal",
	label: "Ethereal",
	plugin: plugin,
	root: true,
};

export const tools: LibTool[] = [];
export const currentlyRunning = new Set<LibTool>();
// export const [onToolAdded, toolAdded] = event<[tool: LibTool]>();
// export const [onToolRemoving, toolRemoving] = event<[tool: LibTool]>();
export const [onToolChanged, toolChanged] = event<[tool: LibTool]>();

export const toolActions = new Map<LibTool, Map<string, Array<() => void>>>();
export const [onToolActionsChanged, toolActionsChanged] = event<[tool: LibTool]>();

// FUTURE: bad type, needs recursive Luau type restrictions to be lifted
export class ArgumentContext<T> implements LibArgumentContext<T> {
	onChange(callback: (newValue: T) => void): Cleanup {
		throw "not yet implemented";
	}

	now(): T {
		throw "not yet implemented";
	}

	nowOr<U>(defaultValue: U): T | U {
		throw "not yet implemented";
	}

	assertBoolean(): LibArgumentContext<boolean> {
		throw "not yet implemented";
	}

	assertColor3(): LibArgumentContext<Color3> {
		throw "not yet implemented";
	}

	assertVector2(): LibArgumentContext<Vector2> {
		throw "not yet implemented";
	}

	assertVector3(): LibArgumentContext<Vector3> {
		throw "not yet implemented";
	}

	assertColorSequence(): LibArgumentContext<ColorSequence> {
		throw "not yet implemented";
	}
}

export class RunContext implements LibRunContext {
	readonly coFolder?: Instance;
	readonly obby?: Instance;
	readonly frame?: Instance;
	readonly winPad?: Instance;
	readonly spawnLocation?: Instance;

	constructor(
		private _run: RunRequest,
		readonly tower?: TowerInstance,
	) {
		this.coFolder = tower?.ClientSidedObjects;
		this.obby = tower?.Obby;
		this.frame = tower?.Frame;
		this.winPad = tower?.Obby.WinPad;
		this.spawnLocation = tower?.SpawnLocation;
	}

	arg(argName: string): LibArgumentContext<unknown> {
		throw "not yet implemented";
	}

	confirm(): boolean {
		throw "not yet implemented";
	}

	notify(): void {
		throw "not yet implemented";
	}

	onAction(buttonLabel: string, callback: () => void): Cleanup {
		let allActions = toolActions.get(this._run.tool) ?? new Map();
		let actionCallbacks = allActions.get(buttonLabel) ?? [];

		actionCallbacks.push(callback);
		allActions.set(buttonLabel, actionCallbacks);
		toolActions.set(this._run.tool, allActions);
		toolActionsChanged(this._run.tool);

		return () => {
			const i = actionCallbacks.indexOf(callback);
			if (i === -1) return;
			actionCallbacks.remove(i);
			toolActionsChanged(this._run.tool);
		};
	}

	onKeyPressed(keycodes: Enum.KeyCode[], callback: () => void): Cleanup {
		throw "not yet implemented";
	}

	onStop(keycodes: Enum.KeyCode[], callback: () => void): Cleanup {
		throw "not yet implemented";
	}
}

export function fullNameOf(tool: LibTool) {
	return `@${tool.source.name}/${tool.name}`;
}

export function createBuiltinTool(props: Omit<LibTool, "source">) {
	const tool = SiftDictionary.copyDeep(props) as LibTool;
	tool.source = ROOT_TOOL_SOURCE;
	tools.push(tool);
	toolChanged(tool);
}

export async function runTool(run: RunRequest) {
	if (currentlyRunning.has(run.tool)) return;
	const ctx = new RunContext(run, peek(selectedTower));

	currentlyRunning.add(run.tool);
	const [ok, result] = pcall((run: RunRequest, ctx: RunContext) => run.tool.run(ctx), run, ctx);
	if (!ok) warn(`Failed to run ${fullNameOf(run.tool)}, the tool won't clean up': ${result}`);
	currentlyRunning.delete(run.tool);
}
