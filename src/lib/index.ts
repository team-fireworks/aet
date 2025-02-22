import type { Argument, Lib, NewToolProps, ToolAction } from "@rbxts/ethereal-for-plugins";
import { Observer, peek, Scope, scoped, Value } from "@rbxts/fusion";
import { Dictionary } from "@rbxts/sift";
import assets from "assets";
import { selectedTower } from "lib/tower";
import { plugin } from "plugin";
import { scope } from "scoped";

export enum TowerKind {
	EternalTowersOfHell = "etoh",
	MultiTowerKitV4 = "mtkv4",
	MultiTowerKitV3 = "mtkv3",
	/// @deprecated not yet implemented
	TotalFireTowers = "tft",
}

export interface LibBaseArgument {
	label: string;
	kind: string;
	value: Value<unknown>;
}

interface GenericLibArgument<K extends string, T> extends LibBaseArgument {
	kind: K;
	value: Value<T>;
}

export interface LibBooleanArgument extends GenericLibArgument<"boolean", boolean> {}
export interface LibNumberSequenceArgument extends GenericLibArgument<"numberSequence", NumberSequence> {}
export interface LibColorArgument extends GenericLibArgument<"color", Color3> {}
export interface LibColorSequenceArgument extends GenericLibArgument<"colorSequence", ColorSequence> {}
export interface LibVector2Argument extends GenericLibArgument<"vector2", Vector2> {}
export interface LibVector3Argument extends GenericLibArgument<"vector3", Vector3> {}
export interface LibCFrameArgument extends GenericLibArgument<"cframe", CFrame> {}

export interface LibStringArgument extends GenericLibArgument<"string", string> {
	placeholder?: string;
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	maxGraphemes?: number;
	minGraphemes?: number;
}

export interface LibNumberArgument extends GenericLibArgument<"number", number> {
	min?: number;
	max?: number;
	step?: number;
	slider?: {
		min?: number;
		max?: number;
		step?: number;
	};
}

export type LibArgument =
	| LibBooleanArgument
	| LibNumberSequenceArgument
	| LibColorArgument
	| LibColorSequenceArgument
	| LibVector2Argument
	| LibVector3Argument
	| LibCFrameArgument
	| LibStringArgument
	| LibNumberArgument;

export interface LibSource {
	id: string;
	name: string;
	icon: string;
	plugin: Plugin;

	_scope: Scope;
	_ethereal: boolean;
}

export interface LibAction {
	label: string;
	onClickCallbacks: Set<() => void>;
}

export interface LibTool extends NewToolProps {
	_arguments: LibArgument[];
	_actions: LibAction[];
	_source: LibSource;
	_scope: Scope;
	_lib: Lib;
}

export function newSource(source: { id: string; name: string; icon: string }, isEthereal: boolean = false): LibSource {
	const sourceScope = scoped();
	scope.push(sourceScope);

	return {
		id: source.id,
		name: source.name,
		icon: source.icon,
		plugin: plugin,

		_scope: sourceScope,
		_ethereal: isEthereal,
	};
}

export const ETHEREAL_SOURCE = newSource({ id: "ethereal", name: "Ethereal", icon: assets.images.ethereal }, true);

export const tools = scope.Value(new Set<LibTool>());

export function newAction(action: LibAction): ToolAction {
	return Dictionary.freezeDeep<ToolAction>({
		onClick(callback) {
			action.onClickCallbacks.add(callback);
			return () => {
				action.onClickCallbacks.delete(callback);
			};
		},
	}) as ToolAction;
}

export function pushArg(scope: Scope, pushTo: LibArgument[], arg: LibArgument): Argument<unknown> {
	pushTo.push(arg);
	tools.set(peek(tools));

	return Dictionary.freezeDeep<Argument<unknown>>({
		now() {
			return peek(arg.value as never);
		},

		onChange(callback) {
			return Observer(scope, arg.value).onChange(() => callback(peek(arg.value as never)));
		},

		onBind(callback) {
			return Observer(scope, arg.value).onBind(() => callback(peek(arg.value as never)));
		},
	}) as Argument<unknown>;
}

export function newLib(
	libScope: Scope,
	{ id, name, overview, description, _arguments, _actions, _source }: LibTool,
): Lib {
	const fullname = `@${_source.id}/${id}`;

	// NOTE: using table.freeze over Sift to not freeze the scope
	return table.freeze({
		scope: libScope,

		tower() {
			const t = peek(selectedTower);
			if (!t) return undefined;

			return table.freeze({
				instance: t,

				coFolder: t.ClientSidedObjects,
				obby: t.Obby,
				frame: t.Frame,
				spawn: t.SpawnLocation,
				winpad: t.Obby.WinPad,
			});
		},

		args: table.freeze({
			boolean(arg) {
				return pushArg(libScope, _arguments, {
					kind: "boolean",
					label: arg.label,
					value: Value(libScope, arg.default),
				}) as never;
			},

			select(arg) {
				throw "not yet implemented";
			},

			string(arg) {
				return pushArg(libScope, _arguments, {
					kind: "string",
					label: arg.label,
					value: Value(libScope, arg.default),

					pattern: arg.pattern,
					placeholder: arg.placeholder,
					minLength: arg.minLength,
					maxLength: arg.maxLength,
					minGraphemes: arg.minGraphemes,
					maxGraphemes: arg.maxGraphemes,
				}) as never;
			},

			number(arg) {
				return pushArg(libScope, _arguments, {
					kind: "number",
					label: arg.label,
					value: Value(libScope, arg.default),

					min: arg.min,
					max: arg.max,
					step: arg.step,
					slider: arg.slider,
				}) as never;
			},

			numberSeqeunce(arg) {
				return pushArg(libScope, _arguments, {
					kind: "numberSequence",
					label: arg.label,
					value: Value(libScope, arg.default),
				}) as never;
			},

			color(arg) {
				return pushArg(libScope, _arguments, {
					kind: "color",
					label: arg.label,
					value: Value(libScope, arg.default),
				}) as never;
			},

			colorSequence(arg) {
				return pushArg(libScope, _arguments, {
					kind: "colorSequence",
					label: arg.label,
					value: Value(libScope, arg.default),
				}) as never;
			},

			vector2(arg) {
				return pushArg(libScope, _arguments, {
					kind: "vector2",
					label: arg.label,
					value: Value(libScope, arg.default),
				}) as never;
			},

			vector3(arg) {
				return pushArg(libScope, _arguments, {
					kind: "vector3",
					label: arg.label,
					value: Value(libScope, arg.default),
				}) as never;
			},

			cframe(arg) {
				return pushArg(libScope, _arguments, {
					kind: "cframe",
					label: arg.label,
					value: Value(libScope, arg.default),
				}) as never;
			},
		}),

		self: table.freeze({
			id,
			name,
			overview,
			description,

			fullname: fullname,

			source: table.freeze({
				id: _source.id,
				name: _source.name,
				icon: _source.icon,
				plugin: _source.plugin,
			}),
		}),

		widget() {
			throw "not yet implemented";
		},

		action({ label }) {
			const a: LibAction = {
				label,
				onClickCallbacks: new Set(),
			};

			_actions.push(a);
			tools.set(peek(tools));
			return newAction(a);
		},

		notify() {
			throw "not yet implemented";
		},

		popup() {
			throw "not yet implemented";
		},

		confirm() {
			throw "not yet implemented";
		},
	});
}

export function newTool(source: LibSource, tool: NewToolProps) {
	const toolScope = scoped();
	scope.push(toolScope);

	const t: LibTool = {
		id: tool.id,
		name: tool.name,
		overview: tool.overview,
		description: tool.description,

		needsTower: tool.needsTower,
		needsEdit: tool.needsEdit,
		needsRunning: tool.needsRunning,

		init: tool.init,

		_arguments: [],
		_actions: [],
		_source: source,
		_scope: toolScope,

		_lib: undefined as never,
	};

	t._lib = newLib(toolScope, t);
	peek(tools).add(t);
	tools.set(peek(tools));
}

export async function initTool(tool: LibTool) {
	if (tool._source._ethereal) {
		tool.init(tool._lib);
	} else {
		// TODO: sandboxing
	}
}
