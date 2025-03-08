// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Extension, NewCommandProps } from "@rbxts/aet";

export interface LibExtension extends Extension {
	_commands: Set<LibCommand>;
	_isExternalExtension: boolean;
}

export interface LibCommand extends NewCommandProps {
	_extension: LibExtension;
}

export interface KitClientObject {
	name: string;
	description: string;

	insert: (parent: Instance, position: CFrame) => Instance[];
}

export interface Kit {
	name: string;
	description: string;

	clientObjects: KitClientObject[];
}
