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
