// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

type Maybe<T> = T | undefined;
type Cleanup = () => void;

export = Et;
export as namespace Et;
declare namespace Et {
	export interface TowerObbyInstance extends Instance {
		WinPad: BasePart;
	}

	export interface TowerInstance extends Instance {
		ClientSidedObjects: Instance;
		Obby: TowerObbyInstance;
		Frame: Instance;
		SpawnLocation: BasePart;
	}

	export interface ExtensionContext {
		plugin: Plugin;
		name: string;
		icon: string;

		registerCommand(props: RegisterCommandProps, run: (ctx: CommandContext) => void): void;
	}

	export interface RegisterCommandProps {
		name: string;
		description: string;
	}

	export interface CommandContext {
		getSelectedTower(): Maybe<TowerInstance>;

		askString(purpose: string, initial?: string): string;
		askColor3(purpose: string, initial?: Color3): Color3;
		askColorSequence(purpose: string, initial?: ColorSequence): ColorSequence;

		hideMainView(): void;
	}

	export interface RegisterExtensionProps {
		plugin: Plugin;
		name: string;
		icon: string;
		needs: string[];
	}

	export function registerExtension(props: RegisterExtensionProps, fn: (ext: ExtensionContext) => void): void;
}
