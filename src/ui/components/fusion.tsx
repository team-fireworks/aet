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

import Fusion, { Child, Computed, Scope, StateObject, Use, UsedAs } from "@rbxts/fusion";

export interface ForValuesProps<V, S> {
	scope: Scope<S>;
	each: UsedAs<Array<V> | Map<unknown, V>>;
	children: (use: Use, scope: Scope<S>, value: V) => Child;
}

export function ForValues<V, S>({ scope, each, children }: ForValuesProps<V, S>): UsedAs<Child> {
	return Fusion.ForValues(scope, each, children) as never;
}

export interface ForKeysProps<K, S> {
	scope: Scope<S>;
	each: UsedAs<Map<K, unknown>>;
	children: (use: Use, scope: Scope<S>, key: K) => Child;
}

export function ForKeys<V, S>({ scope, each, children }: ForKeysProps<V, S>): UsedAs<Child> {
	return Fusion.ForKeys(scope, each, children) as never;
}

// TODO: bad type alert
export interface ForPairsProps<K, V, S> {
	scope: Scope<S>;
	each: UsedAs<Map<K, V>>;
	children: (use: Use, scope: Scope<S>, key: K, value: V) => LuaTuple<[key: Child, value: Child]>;
}

export function ForPairs<K, V, S>({ scope, each, children }: ForPairsProps<K, V, S>): UsedAs<Child> {
	return Fusion.ForPairs(scope, each, children) as never;
}

export interface ShowProps<S> {
	scope: Scope<S>;
	when: UsedAs<boolean>;
	children: (scope: Scope<S>) => Child;
	fallback?: (scope: Scope<S>) => Child;
}

export function Show<S>({ scope, when, children, fallback }: ShowProps<S>): StateObject<Child> {
	return Computed(scope, (use, scope) => {
		if (use(when)) {
			return children(scope);
		}
		if (fallback) {
			return fallback(scope);
		}
		return undefined;
	});
}

export function Fragment(arg: unknown[]) {
	return arg;
}
