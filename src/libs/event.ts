// https://github.com/Elttob/LibOpen/blob/main/LibOpen/Event/init.lua
// Based on Elttob/LibOpen, licensed under MIT:
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software
// and associated documentation files (the “Software”), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
