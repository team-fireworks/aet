// From Ethereal, licensed under the GNU General Public License v3.0

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
