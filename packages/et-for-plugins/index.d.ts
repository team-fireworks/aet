// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

type Maybe<T> = T | undefined;
type Cleanup = () => void;

export = Ethereal;
export as namespace Ethereal;
declare namespace Ethereal {
	/// Permissions a plugin might request.
	export enum Permission {
		/// Allows the plugin to register and execute custom commands.
		NewCommand,
	}

	/// The Obby folder inside EToH towers.
	export interface TowerObbyInstance extends Instance {
		WinPad: BasePart;
	}

	/// An EToH tower instance.
	export interface TowerInstance extends Instance {
		ClientSidedObjects: Instance;
		Obby: TowerObbyInstance;
		Frame: Instance;
		SpawnLocation: BasePart;
	}

	// export enum TowerKind {
	// 	/// A standalone tower with a standard EToH kit
	// 	EternalTowersOfHell = "etoh",
	// 	/// An EToH tower inside a MTK v4 game
	// 	MultiTowerKitV4 = "mtkv4",
	// 	/// An EToH tower inside a MTK v3 game
	// 	MultiTowerKitV3 = "mtkv3",
	// 	/// A Total Fire Towers tower that uses the Mechanics API
	// 	/// @deprecated unsupported for now
	// 	TotalFireTowers = "tft",
	// }

	// export interface TowerMusicZone extends Instance {
	// 	Music: Sound[];
	// 	Part: BasePart;
	// 	Priority: NumberValue;
	// }

	/// Contextual library available to `run` callbacks in commands.
	export interface CommandRun {
		/// The currently selected tower, if any.
		///
		/// This is safe to assert if `towerSelected` is specified as a command
		/// predicate.
		selectedTower: Maybe<TowerInstance>;

		/// Prompts the user for a string value.
		promptString(placeholderLabel: string, initial?: string): string;
		/// Prompts the user for a Color3 value.
		promptColor3(placeholderLabel: string, initial?: Color3): Color3;
		/// Prompts the user for a ColorSequence value.
		promptColorSequence(placeholderLabel: string, initial?: ColorSequence): ColorSequence;

		/// Hides the main plugin view.
		hideMainView(): void;
	}

	/// The Ethereal plugin state passed to command predicates.
	export interface CommandPredicateState {
		/// The currently selected tower, if any.
		tower: Maybe<TowerInstance>;
		/// The array of currently selected instances in the game.
		selection: Instance[];
	}

	/// Result of a successful command predicate check.
	export interface CommandPredicateOk {
		ok: true;
	}

	/// Result of a failed command predicate check.
	export interface CommandPredicateError {
		ok: false;
		brief: string;
		tip: string;
	}

	/// Result of a command predicate evaluation.
	export type CommandPredicateResult = CommandPredicateOk | CommandPredicateError;

	/// Function that checks if a command can be executed based on the current
	/// Ethereal plugin state.
	export type CommandPredicate = (state: CommandPredicateState) => CommandPredicateResult;

	/// Represents a plugin command.
	export interface Command {
		icon: string;
		/// Name of the command
		name: string;
		/// Brief description of the command.
		description: string;

		/// Optional predicates that must pass for the command to run.
		predicates?: CommandPredicate[];
		/// Function to execute when the command is invoked. Can optionally
		/// return a cleanup function.
		run: (run: CommandRun) => void | undefined | Cleanup;
	}

	export interface EtherealPermissioned {
		register: (command: Command) => void;
		predicates: {
			/// Requires an EToH tower that has client objects to be selected.
			towerSelected: CommandPredicate;

			/// Requires at least `min` instances to be selected.
			minInstancesSelected(min: number): CommandPredicate;
			/// Requires at most `max` instances to be selected.
			maxInstancesSelected(max: number): CommandPredicate;

			/// Requires a tower kit version greater than or equal to `version`.
			kitVersion(version: number): CommandPredicate;
			/// Requires an exact tower kit version.
			exactKitVersion(version: number): CommandPredicate;
			/// Requires kit version 6. Shorthand to `kitVersion(6)`.
			kitVersion6: CommandPredicate;
			/// Requires kit version 5.5. Shorthand to `kitVersion(5.5)`
			kitVersion5_5: CommandPredicate;
		};
	}
}
