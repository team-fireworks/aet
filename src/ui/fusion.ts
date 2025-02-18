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

import { Observer, peek, Scope, StateObject, UsedAs, Value } from "@rbxts/fusion";

// temporary until fusion drops the delay api
export function delay<T>(scope: Scope, watching: UsedAs<T>, delaySeconds: number) {
	const value = Value(scope, peek(watching));

	Observer(scope, watching).onChange(() => {
		const now = peek(watching);
		task.wait(delaySeconds);
		if (peek(watching) === now) value.set(now);
	});

	return value as StateObject<T>;
}

export function usePrevious<T>(scope: Scope, watching: UsedAs<T>) {
	const previous = Value<Maybe<T>>(scope, undefined);

	Observer(scope, watching).onChange(() => {
		const current = peek(watching);
		const old = peek(previous);

		previous.set(current);
	});

	return previous as StateObject<Maybe<T>>;
}
