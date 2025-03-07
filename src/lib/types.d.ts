// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Extension, NewCommandProps } from "@rbxts/et";

export interface LibExtension extends Extension {
	_commands: Set<LibCommand>;
	_isExternalExtension: boolean;
}

export interface LibCommand extends NewCommandProps {}
