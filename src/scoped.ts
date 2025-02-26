// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Computed, scoped, Spring, Use } from "@rbxts/fusion";
// import { delay } from "./fusion";

export const methods = {
	spawnTask<Args extends unknown[]>(this: Fusion.Scope, fn: (...args: Args) => unknown, ...args: Args): () => void {
		const thread = task.spawn(fn, ...args);

		function destroy() {
			task.cancel(thread);
		}

		this.push(destroy);
		return destroy;
	},

	computedSpring<S, T>(
		this: Fusion.Scope<S>,
		processor: (use: Use, scope: Fusion.Scope<S>) => T,
		speed = 30,
		damping = 1,
	) {
		return Spring(scope, Computed(this, processor), speed, damping);
	},

	// delay<T>(this: Fusion.Scope, watching: UsedAs<T>, delaySeconds: number) {
	// 	return delay(this, watching, delaySeconds);
	// },
};

export const scope = scoped(Fusion, methods);
export type Scope = Fusion.Scope<typeof Fusion & typeof methods>;

export interface Scoped {
	scope: Scope;
}
