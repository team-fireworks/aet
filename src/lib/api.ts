import { peek } from "@rbxts/fusion";
import { info, trace } from "log";
import { scope } from "ui/scoped";
import { createToolContext, ToolContext } from "./context";
import { selectedTower } from "./tower";
export class ToolMethod {
	constructor(
		readonly label: string,
		readonly showInWidget: boolean = true,
	) {}
}

export interface BaseToolArgument {
	kind: string;
	name: string;
	label: string;
	description?: string;
}

interface GenericToolArgument<K extends string, T> extends BaseToolArgument {
	kind: K;
	default: T;
}

export type ToolBooleanArgument = GenericToolArgument<"boolean", boolean>;
// TODO: these are unimplemented
export type ToolStringArgument = GenericToolArgument<"string", string>;
export type ToolVector2Argument = GenericToolArgument<"vector2", Vector2>;
export type ToolVector3Argument = GenericToolArgument<"vector3", Vector3>;
export type ToolColorArgument = GenericToolArgument<"color", Color3>;
export type ToolColorSequenceArgument = GenericToolArgument<"colorSequence", ColorSequence>;
export type ToolKeyCodeArgument = GenericToolArgument<"keyCode", Enum.KeyCode>;

export interface ToolSelectArgument<T> extends BaseToolArgument {
	kind: "select";
	default: T;
	options: Array<{ value: T; label: string }>;
}

export type ToolArgument =
	| ToolBooleanArgument
	| ToolStringArgument
	| ToolVector2Argument
	| ToolVector3Argument
	| ToolColorArgument
	| ToolColorSequenceArgument
	| ToolKeyCodeArgument
	| ToolSelectArgument<unknown>;

export namespace Methods {
	export const Default = new ToolMethod("Run");
	export const Background = new ToolMethod("Background", false);
	export const Custom = (name: string) => new ToolMethod(name);
}

export interface Source {
	name: string;
	icon: string;
	plugin: Plugin;
	root: boolean;
}

// export interface ToolContextArgument<T> {
// 	unwrap(): T;
// 	unwrapOr<U>(defaultValue: U): T | U;
// 	assertNonNil(): ToolContextArgument<NonNullable<T>>;
// 	assertString(): ToolContextArgument<string>;
// 	assertNumber(): ToolContextArgument<number>;
// 	assertBoolean(): ToolContextArgument<boolean>;
// 	assertKeyCode(): ToolContextArgument<Enum.KeyCode>;
// }

// export interface ToolContext {
// 	Argument(name: string): ToolContextArgument<unknown>;
// }

type ToolMethodFn = (ctx: ToolContext) => void;

export interface Tool {
	id: string;
	name: string;
	description: string;
	tags: [];

	source: Source;

	needsEdit?: boolean;
	needsIngame?: boolean;
	needsTower?: boolean;

	args?: ToolArgument[];
	methods: Map<ToolMethod, ToolMethodFn>;
}

export const ROOT_SOURCE: Source = {
	name: "Ethereal",
	icon: "rbxassetid://1234567890",
	plugin: script.FindFirstAncestorWhichIsA("Plugin")!,
	root: true,
};

export const tools = scope.Value<Tool[]>([]);
scope.Observer(tools).onBind(() =>
	trace(
		`Tools: ${peek(tools)
			.map((v) => v.name)
			.join(", ")}`,
	),
);

export const nameSortedTools = scope.Computed((use) => use(tools).sort((lhs, rhs) => lhs.name < rhs.name));

export function registerTool(props: Tool) {
	info(`Registering new tool ${props.name} from plugin ${props.source.name}`);
	peek(tools).push(props);
	tools.set(peek(tools));
}

export function tryCallMethod(tool: Tool, fn: ToolMethodFn) {
	const tower = peek(selectedTower);

	if (tool.needsTower) {
		if (!tower) return;
	}

	const ctx = createToolContext({ tower });
	fn(ctx);
}
