// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

type Maybe<T> = T | undefined;
type Cleanup = () => void;

export = Ethereal;
export as namespace Ethereal;
declare namespace Ethereal {
	export enum Permission {
		CreateTools,
	}

	export interface TowerObbyInstance extends Instance {
		WinPad: BasePart;
	}

	export interface TowerInstance extends Instance {
		ClientSidedObjects: Instance;
		Obby: TowerObbyInstance;
		Frame: Instance;
		SpawnLocation: BasePart;
	}

	export enum TowerKind {
		/// A standalone tower with a standard EToH kit
		EternalTowersOfHell = "etoh",
		/// An EToH tower inside a MTK v4 game
		MultiTowerKitV4 = "mtkv4",
		/// An EToH tower inside a MTK v3 game
		MultiTowerKitV3 = "mtkv3",
		/// A Total Fire Towers tower that uses the Mechanics API
		/// @deprecated unsupported for now
		TotalFireTowers = "tft",
	}

	// TODO: type the instance
	export interface TowerMusicZone extends Instance {
		Music: Sound[];
		Part: BasePart;
		Priority: NumberValue;
	}

	export interface Tower {
		// kind: TowerKind;

		instance: TowerInstance;
		coFolder: Instance;
		obby: Instance;
		frame: Instance;
		spawn: BasePart;
		winpad: BasePart;

		// musicZones: TowerMusicZone[];
	}

	export interface Argument<T> {
		now(): T;
		onChange(callback: (arg: T) => void): Cleanup;
		onBind(callback: (arg: T) => void): Cleanup;
	}

	export interface ToolWidget {}

	export interface ToolAction {
		onClick(callback: () => void): Cleanup;
	}

	/// Ethereal tool APIs
	export interface Lib {
		tower(): Maybe<Tower>;

		/// Arguments
		args: {
			/// Creates a new boolean argument
			boolean(arg: { label: string; default: boolean }): Argument<boolean>;

			/// Creates a new string argument
			string(arg: {
				label: string;
				default: string;
				pattern?: string;
				placeholder?: string;
				maxLength?: number;
				minLength?: number;
				maxGraphemes?: number;
				minGraphemes?: number;
			}): Argument<string>;

			/// Creates a new number argument
			number(arg: {
				label: string;
				default: number;
				min?: number;
				max?: number;
				step?: number;
				slider?: {
					min?: number;
					max?: number;
					step?: number;
				};
			}): Argument<number>;

			/// Creates a new select argument
			select<T extends Array<{ kind: string; value: string }>>(arg: {
				label: string;
				default: keyof T;
				values: T;
			}): Argument<T[number]["value"]>;

			/// Creates a new Vector2 argument
			vector2(arg: { label: string; default: Vector2 }): Argument<Vector2>;

			/// Creates a new Vector3 argument
			vector3(arg: { label: string; default: Vector3 }): Argument<Vector3>;

			/// Creates a new CFrame argument
			cframe(arg: { label: string; default: CFrame }): Argument<CFrame>;

			/// Creates a new Color3 argument
			color(arg: { label: string; default: Color3 }): Argument<Color3>;

			/// Creates a new ColorSequence argument
			colorSequence(arg: { label: string; default: ColorSequence }): Argument<ColorSequence>;

			/// Creates a new NumberSequence argument
			numberSeqeunce(arg: { label: string; default: NumberSequence }): Argument<NumberSequence>;
		};

		/// Tool information
		self: {
			id: string;
			name: string;
			overview: string;
			description: string;

			/// Full name of the tool in `@source/tool` form.
			fullname: string;

			/// Source plugin information
			source: {
				id: string;
				name: string;
				icon: string;

				plugin: Plugin;
			};
		};

		/// Creates a new plugin widget.
		widget(): ToolWidget;

		/// Creates a new action.
		action(props: { label: string; needsTower?: boolean }): ToolAction;

		/// Pushes a notification to the viewport.
		notify(): Cleanup;

		/// Creates a new popup.
		popup(): ToolWidget;

		/// Prompts the user for confirmation.
		confirm(): boolean;

		/// The cleanup scope that this tool uses. Values `.push`ed will be
		/// cleaned up based on the following:
		///
		/// - if `function`, it is called
		/// - ...else if `Instance`, `.Destroy()` is called
		/// - ...else if `RBXScriptConnection`, `.Disconnect()` is called
		/// - ...else if `thread`, `task.cancel` is called
		/// - ...else if `{ destroy(): void }`, `.destroy()` is called
		/// - ...else if `{ Destroy(): void }`, `.Destroy()` is called
		/// - ...else if `unknown[]`, it's values are cleaned up.
		///
		/// If none of these conditions match, the value is ignored.
		///
		/// This is a no-constructor [Fusion 0.3 scope](https://elttob.uk/Fusion/0.3/api-reference/memory/types/scope/).
		/// This scope is cleaned up once the Ethereal plugin is unloaded.
		scope: unknown[];
	}

	export interface NewToolProps {
		/// camelCase identifier of this tool. Used internally for saving
		/// default arguments.
		id: string;
		name: string;
		/// Brief overview of this tool. Shown in the Tool tab.
		overview: string;
		/// Describes the tool. Shown when the tool is expanded in the tool tab.
		description: string;

		needsEdit?: boolean;
		needsRunning?: boolean;
		needsTower?: boolean;

		init: (lib: Lib) => Maybe<Cleanup> | void;
	}

	export interface Permissioned {
		newTool(props: NewToolProps): void;
	}

	export interface PermissionProps {
		id: string;
		name: string;
		icon: string;

		// Required so plugin developers put in some effort about what
		// permissions to request. You don't want an EToH plugin to become an
		// attack vector right?
		permissions: Array<{
			permission: Permission;
			usedTo: string[];
			notUsedTo: string[];
		}>;
	}

	export interface TryPermissionResultOk {
		ok: true;
		api: Permissioned;
	}

	export interface TryPermissionResultErr {
		ok: false;
		id: "alreadyPermissioned" | "isPermissioning" | "notInstalled" | "deniedPermission" | "invalidType";
		reason: string;
	}

	export type TryPermissionResult = TryPermissionResultOk | TryPermissionResultErr;

	export function permission(plugin: Plugin, props: PermissionProps): Permissioned;
	export function tryPermission(plugin: Plugin, props: PermissionProps): TryPermissionResult;
}
