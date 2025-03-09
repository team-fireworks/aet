// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

declare namespace AetUtils {
	export interface ClientObjectInstance extends Instance {
		ClientObject: BoolValue;
	}

	export function isClientObject(inst: Instance): inst is ClientObjectInstance;
}

export = AetUtils;
export as namespace AetUtils;
