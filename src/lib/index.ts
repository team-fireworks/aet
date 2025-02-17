import { peek } from "@rbxts/fusion";
import SiftDictionary from "@rbxts/sift/out/Dictionary";
import { selectedTower } from "lib/tower";
import { debug } from "log";
import { plugin } from "plugin";
import { scope } from "ui/scoped";
import { event } from "utils/event";
import { TowerInstance } from "./tower";
import type { Action, LibArgumentContext, LibRunContext, LibTool, LibToolSource, RunRequest } from "./types";

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

export const toolActions = new Map<LibTool, Action[]>();
export const [onToolActionsChanged, toolActionsChanged] = event<[tool: LibTool]>();

export const toolArgs = scope.Value(new Map<LibTool, Map<string, unknown>>());
scope.Observer(toolArgs).onBind(() => debug(`TOOL ARGS: ${peek(toolArgs)}`));

// FUTURE: bad type, needs recursive Luau type restrictions to be lifted
export class ArgumentContext<T> implements LibArgumentContext<T> {
	constructor(
		readonly argName: string,
		private _run: RunRequest,
	) {}

	onChange(callback: (newValue: T) => void): Cleanup {
		throw "not yet implemented";
	}

	now(): T {
		return peek(toolArgs).get(this._run.tool)!.get(this.argName)! as T;
	}

	nowOr<U>(defaultValue: U): T | U {
		return this.now() ?? defaultValue;
	}

	assertBoolean(): LibArgumentContext<boolean> {
		if (!typeIs(this.now(), "boolean"))
			throw `Expected ${fullNameOf(this._run.tool)} argument ${this.argName} to be a boolean, got ${typeOf(this.now())}`;
		return this as never;
	}

	assertColor3(): LibArgumentContext<Color3> {
		if (!typeIs(this.now(), "Color3"))
			throw `Expected ${fullNameOf(this._run.tool)} argument ${this.argName} to be a Color3, got ${typeOf(this.now())}`;
		return this as never;
	}

	assertVector2(): LibArgumentContext<Vector2> {
		if (!typeIs(this.now(), "Vector2"))
			throw `Expected ${fullNameOf(this._run.tool)} argument ${this.argName} to be a Vector2, got ${typeOf(this.now())}`;
		return this as never;
	}

	assertVector3(): LibArgumentContext<Vector3> {
		if (!typeIs(this.now(), "Vector3"))
			throw `Expected ${fullNameOf(this._run.tool)} argument ${this.argName} to be a Vector3, got ${typeOf(this.now())}`;
		return this as never;
	}

	assertColorSequence(): LibArgumentContext<ColorSequence> {
		if (!typeIs(this.now(), "ColorSequence"))
			throw `Expected ${fullNameOf(this._run.tool)} argument ${this.argName} to be a ColorSequence, got ${typeOf(this.now())}`;
		return this as never;
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
		return new ArgumentContext(argName, this._run);
	}

	confirm(): boolean {
		throw "not yet implemented";
	}

	notify(): void {
		throw "not yet implemented";
	}

	onAction(buttonLabel: string, callback: () => void): Cleanup {
		let actions = toolActions.get(this._run.tool) ?? [];
		let thisAction = actions.find((v) => v.name === buttonLabel);

		if (!thisAction) {
			const newAction: Action = {
				index: actions.size() + 1,
				name: buttonLabel,
				callbacks: [],
			};

			actions.push(newAction);
			thisAction = newAction;
		}

		thisAction.callbacks.push(callback);
		toolActions.set(this._run.tool, actions);
		toolActionsChanged(this._run.tool);

		return () => {
			const i = thisAction.callbacks.indexOf(callback);
			if (i === -1) return;
			thisAction.callbacks.remove(i);
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

	const args = new Map<string, unknown>();
	for (const a of tool.args) {
		args.set(a.name, a.default);
	}

	// NOTE: this is okay because Fusion always recompute tables
	peek(toolArgs).set(tool, args);
	toolArgs.set(peek(toolArgs));

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
