/// @deprecated use `log`
declare function print(_: never): never;

/// @deprecated use `log`
declare function warn(_: never): never;

/// @deprecated throw instead
declare function error(_: never): never;

interface LuaMetatable<T> {
	__index?: (self: T, index: unknown) => void;
	__newindex?: (self: T, index: unknown, value: unknown) => void;
	__add?: (self: T, other: T) => T;
	__sub?: (self: T, other: T) => T;
	__mul?: (self: T, other: T) => T;
	__div?: (self: T, other: T) => T;
	__mod?: (self: T, other: T) => T;
	__pow?: (self: T, other: T) => T;
	__unm?: (self: T) => T;
	__eq?: (self: T, other: T) => boolean;
	__lt?: (self: T, other: T) => boolean;
	__le?: (self: T, other: T) => boolean;
	__call?: (self: T, ...args: Array<unknown>) => void;
	__concat?: (self: T, ...args: Array<unknown>) => string;
	__tostring?: (self: T) => string;
	__len?: (self: T) => number;
	__mode?: "k" | "v" | "kv";
	__metatable?: string;
}

declare function setmetatable<T extends object>(object: T, metatable: LuaMetatable<T>): T;

declare function getfenv(stack: Callback): unknown;
declare function setfenv(stack: Callback, fenv: object): void;
