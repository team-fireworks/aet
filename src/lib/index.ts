import type { Argument, Lib, NewToolProps, ToolAction } from "@rbxts/ethereal-for-plugins";
import { peek, Scope, scoped, Value } from "@rbxts/fusion";
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

export interface LibSource {
	id: string;
	name: string;
	icon: string;
	plugin: Plugin;

	_scope: Scope;
	_ethereal: boolean;
}

export interface LibArgument {
	label: string;
	kind: string;
	value: Value<unknown>;
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

export function newArg(arg: LibArgument): Argument<unknown> {
	return Dictionary.freezeDeep<Argument<unknown>>({
		now() {
			return peek(arg.value);
		},

		onChange(callback) {
			throw `not yet implemented`;
		},

		onBind(callback) {
			throw `not yet implemented`;
		},
	}) as Argument<unknown>;
}

export function newLib(
	libScope: Scope,
	{ id, name, overview, description, _arguments, _actions, _source }: LibTool,
): Lib {
	const fullname = `@${_source.id}/${id}`;

	function createArg(label: string, kind: string, value: unknown) {
		const a: LibArgument = {
			kind,
			label,
			value: Value(libScope, value),
		};

		_arguments.push(a);
		tools.set(peek(tools));
		return newArg(a);
	}

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
				return createArg(arg.label, "boolean", arg.default) as never;
			},

			select(arg) {
				throw "not yet implemented";
			},

			string(arg) {
				throw "not yet implemented";
			},

			number(arg) {
				throw "not yet implemented";
			},

			numberSeqeunce(arg) {
				throw "not yet implemented";
			},

			color(arg) {
				throw "not yet implemented";
			},

			colorSequence(arg) {
				throw "not yet implemented";
			},

			vector2(arg) {
				throw "not yet implemented";
			},

			vector3(arg) {
				throw "not yet implemented";
			},

			cframe(arg) {
				throw "not yet implemented";
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
	tool.init(tool._lib);
}
