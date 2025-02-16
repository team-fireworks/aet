// https://github.com/Elttob/LibOpen/blob/main/LibOpen/Event/init.lua

type Disconnect = () => void;
export type Handler<Args extends unknown[]> = (...args: Args) => void;
export type Connect<Args extends unknown[]> = (callback: Handler<Args>) => Disconnect;
export type Fire<Args extends unknown[]> = (...args: Args) => void;

export function event<Args extends unknown[]>(): LuaTuple<[Connect<Args>, Fire<Args>]> {
	const listeners = new Map<object, Handler<Args>>();

	return $tuple(
		(callback: Handler<Args>): Disconnect => {
			const key = table.freeze({});
			listeners.set(key, callback);
			return () => listeners.delete(key);
		},
		(...args: Args) => {
			for (const [, listener] of pairs(listeners)) task.spawn(listener, ...args);
		},
	);
}
