import Fusion, { scoped } from "@rbxts/fusion";

export const methods = {
	spawnTask: <Args extends unknown[]>(
		scope: Fusion.Scope,
		fn: (...args: Args) => unknown,
		...args: Args
	): (() => void) => {
		const thread = task.spawn(fn, ...args);

		function destroy() {
			task.cancel(thread);
		}

		scope.push(destroy);
		return destroy;
	},
	// spawnPromise: async <Args extends unknown[], Returns>(
	// 	scope: Fusion.Scope,
	// 	fn: (...args: Args) => Returns,
	// 	...args: Args
	// ): Promise<Returns> => {},
};

export const scope = scoped(Fusion, methods);
export type Scope = Fusion.Scope<typeof Fusion & typeof methods>;

export interface Scoped {
	scope: Scope;
}
