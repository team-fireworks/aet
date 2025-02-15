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

// export interface ToolContextSetting<T> {
// 	unwrap(): T;
// 	unwrapOr<U>(defaultValue: U): T | U;
// 	assertNonNil(): ToolContextSetting<NonNullable<T>>;
// 	assertString(): ToolContextSetting<string>;
// 	assertNumber(): ToolContextSetting<number>;
// 	assertBoolean(): ToolContextSetting<boolean>;
// 	assertKeyCode(): ToolContextSetting<Enum.KeyCode>;
// }

// export interface ToolContext {
// 	setting(name: string): ToolContextSetting<unknown>;
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
