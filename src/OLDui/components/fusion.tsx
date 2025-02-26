// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

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
