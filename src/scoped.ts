// Eternal is a full-featured companion plugin for Eternal Towers of Hell
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

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
