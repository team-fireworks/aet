// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

type Maybe<T> = T | undefined;
type Cleanup = () => void;

export = Aet;
export as namespace Aet;
declare namespace Aet {
	export interface TowerObbyInstance extends Instance {
		WinPad: BasePart;
	}

	export interface TowerInstance extends Instance {
		ClientSidedObjects: Instance;
		Obby: TowerObbyInstance;
		Frame: Instance;
		SpawnLocation: BasePart;
	}

	export interface Extension {
		plugin: Plugin;
		name: string;
		icon: string;
		needs: string[];

		newCommand(props: NewCommandProps): void;
	}

	/** @hidden */
	export interface BaseCommandArgument {
		kind: string;
		purpose: string;
		initialValue: unknown;
	}

	/** @hidden */
	export interface GenericCommandArgument<K extends string, T> extends BaseCommandArgument {
		kind: K;
		initialValue: T;
	}

	export interface Color3CommandArgument extends GenericCommandArgument<"color3", Color3> {}

	export type CommandArgument = Color3CommandArgument;

	/** @hidden */
	export type InferCommandArgumentValue<T extends CommandArgument> = T extends Color3CommandArgument ? Color3 : never;

	export interface NewCommandProps<Arguments extends CommandArgument[] = []> {
		name: string;
		description: string;
		arguments?: Arguments;
		run: (
			ctx: CommandContext,
			...args: { [K in keyof Arguments]: InferCommandArgumentValue<Arguments[K]> }
		) => void;
	}

	export interface CommandContext {
		getSelectedTower(): Maybe<TowerInstance>;

		hideMainView(): void;
	}

	export interface NewExtensiondProps {
		plugin: Plugin;
		name: string;
		icon: string;
		needs: string[];
	}

	export function newExtension(props: NewExtensiondProps): Extension;
}
