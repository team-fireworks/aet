// From Ethereal, licenced under The 3-Clause BSD License.

import Fusion, { Computed, scoped, Spring, Use } from "@rbxts/fusion";

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
};

export const scope = scoped(Fusion, methods);
export type Scope = Fusion.Scope<typeof Fusion & typeof methods>;

export interface Scoped {
	scope: Scope;
}
