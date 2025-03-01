// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { scoped } from "@rbxts/fusion";

export const scopeMethods = {
	spawnThread<Args extends unknown[]>(this: Fusion.Scope, callback: (...args: Args) => unknown, ...args: Args) {
		const thread = task.spawn(callback, ...args);
		function destroy() {
			pcall(task.cancel, thread);
		}
		this.push(destroy);
		return destroy;
	},
};

export const scope = scoped(Fusion, scopeMethods);

export type Scope = typeof scope;

export interface ScopeProps {
	scope: Scope;
}
