import { TowerInstance } from "./tower";

type Cleanup = () => void;

export interface LibBaseArgument {
	kind: string;
	name: string;
	label: string;
}

interface GenericArgument<K extends string, T> extends LibBaseArgument {
	kind: K;
	default: T;
}

// TODO: advanced types: LibStringArgument, LibNumberArgument, LibInstanceArgument
export interface LibBooleanArgument extends GenericArgument<"boolean", boolean> {}
export interface LibColor3Argument extends GenericArgument<"color3", Color3> {}
export interface LibVector2Argument extends GenericArgument<"vector2", Vector2> {}
export interface LibVector3Argument extends GenericArgument<"vector3", Vector3> {}
export interface LibColorSequenceArgument extends GenericArgument<"colorSequence", ColorSequence> {}

export type LibArgument =
	| LibBooleanArgument
	| LibColor3Argument
	| LibVector2Argument
	| LibVector3Argument
	| LibColorSequenceArgument;

// FUTURE: bad type, needs recursive Luau type restrictions to be lifted
export interface LibArgumentContext<T> {
	now(): T;
	nowOr<U>(defaultValue: U): T | U;
	assertBoolean(): LibArgumentContext<boolean>;
	assertColor3(): LibArgumentContext<Color3>;
	assertVector2(): LibArgumentContext<Vector2>;
	assertVector3(): LibArgumentContext<Vector3>;
	assertColorSequence(): LibArgumentContext<ColorSequence>;
}

export interface LibRunContext {
	tower?: TowerInstance;
	coFolder?: Instance;
	obby?: Instance;
	frame?: Instance;
	winPad?: Instance;
	spawnLocation?: Instance;

	arg(argName: string): LibArgumentContext<unknown>;

	confirm(): boolean;
	notify(): void;

	onAction(buttonLabel: string, callback: () => void): Cleanup;
	onKeyPressed(keycodes: Enum.KeyCode[], callback: () => void): Cleanup;
	onStop(keycodes: Enum.KeyCode[], callback: () => void): Cleanup;
}

export interface LibToolSource {
	name: string;
	label: string;
	plugin: Plugin;
	root: boolean;
}

export interface LibTool {
	name: string;
	label: string;
	overview: string;
	description: string;

	needsEdit?: boolean;
	needsRun?: boolean;
	needsTower?: boolean;

	source: LibToolSource;
	args: LibArgument[];

	run: (run: LibRunContext) => unknown;
}

export type Lib = {
	newTool: (tool: LibTool) => void;
	notify: (self: LibRunContext) => void;
};

export interface RunRequest {
	tool: LibTool;
	args: Map<string, { value: unknown }>;
}
