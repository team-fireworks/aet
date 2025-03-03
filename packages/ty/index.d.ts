// Typings for https://github.com/dphfox/ty/
// Ty licensed under BSD-3-Clause + Security Disclaimer

export = ty;
export as namespace ty;
declare namespace ty {
	export type Some<Value> = { some: true; value: Value };
	export type None = { some: false; reason?: string };
	export type Maybe<Value> = Some<Value> | None;

	export type Static<T> = T extends Def<infer CastTo> ? CastTo : never;

	export interface Def<CastTo> {
		ExpectsType: string;
		NotOfTypeError: string;
		Matches(value: unknown): boolean;
		Cast(value: unknown): Maybe<CastTo>;

		Optional(): Def<CastTo | undefined>;
		IgnoreInvalid(): Def<CastTo | undefined>;
		Or<L>(last: Def<L>): Def<CastTo | L>;
		And<L>(last: Def<L>): Def<CastTo & L>;
		IntoTagged<Tag>(tag: Tag): Def<{ __tag: Tag; value: CastTo }>;
		IntoString(): Def<string>;
		IntoNumber(base?: number): Def<number>;
		IntoDefault(defaultValue: NonNullable<CastTo>): Def<NonNullable<CastTo>>;
		Retype<T>(this: Def<any>): Def<T>;
		Untyped(): Def<any>;
		Nicknamed(newName: string): Def<CastTo>;
		CastOrError(x: unknown): CastTo;
	}

	export function Predicate<T>(predicate: (x: unknown) => x is T): Def<T>;
	export function Typeof<T extends keyof CheckableTypes>(typeString: T): Def<CheckableTypes[T]>;
	export function Just<T>(literal: T, type?: string): Def<T>;
	export function Optional<T>(innerDef: Def<T>): Def<T | undefined>;
	export function IgnoreInvalid<T>(innerDef: T): Def<T | undefined>;
	export function Or<F, L>(first: Def<F>, last: Def<L>): Def<F | L>;
	export function And<F, L>(first: Def<F>, last: Def<L>): Def<F & L>;
	export function MapOf<K extends string | number | symbol, V>(keys: Def<K>, values: Def<V>): Def<Record<K, V>>;
	export function MapOf<K, V>(keys: Def<K>, values: Def<V>): Def<Map<K, V>>;
	export function Array<V>(values: Def<V>): Def<V[]>;
	export function Struct<T extends Record<string, Def<unknown>>>(
		options: { exhaustive: boolean },
		object: T,
	): Def<{ [K in keyof T]: Static<T[K]> }>;
	export function Tuple<T extends Array<Def<unknown>>>(
		options: { exhaustive: boolean },
		tuple: T,
	): Def<{ [K in keyof T]: Static<T[K]> }>;
	export function IntoTagged<Tag, T>(innerDef: Def<T>, tag: Tag): Def<{ __tag: Tag; value: T }>;
	export function IntoString<T>(innerDef: Def<T>): Def<string>;
	export function IntoNumber<T>(innerDef: Def<T>, base?: number): Def<number>;
	export function IntoDefault<T>(innerDef: Def<T>, defaultValue: NonNullable<T>): Def<NonNullable<T>>;
	export function Retype<T>(def: Def<any>): Def<T>;
	export function Untyped<T>(def: Def<T>): Def<any>;
	export function Nicknamed<T>(innerDef: Def<T>, newName: string): Def<T>;
	export function CastOrError<T>(def: Def<T>, x: unknown): T;

	export const Unknown: Def<unknown>;
	export const Never: Def<never>;

	export const Number: Def<number>;
	export const Boolean: Def<boolean>;
	export const String: Def<string>;
	export const Thread: Def<thread>;
	export const Table: Def<object>;
	export const Function: Def<(...args: unknown[]) => unknown>;

	export const True: Def<true>;
	export const False: Def<false>;
	export const Nil: Def<undefined>;
}
