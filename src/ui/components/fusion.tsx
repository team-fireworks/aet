import Fusion, { Child, Scope, Use, UsedAs } from "@rbxts/fusion";

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
