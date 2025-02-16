// From Ethereal, licensed under the GNU General Public License v3.0
// Derived from https://github.com/roblaudio/ocmusic-browser/blob/main/src/shared/log.ts
// Inspired by https://crates.io/crates/log

const { warn: luaWarn, debug: luaDebug } = getfenv(0) as unknown as {
	debug: {
		info(this: void, level: number, options: string): LuaTuple<unknown[]>;
		info(this: void, fn: (...args: unknown[]) => unknown, options: string): LuaTuple<unknown[]>;
		info(this: void, thread: thread, level: number, options: string): LuaTuple<unknown[]>;
	};
	warn: (msg: string) => void;
};

export enum LogLevel {
	Trace = 1,
	Debug = 2,
	Info = 3,
	Warn = 4,
	Error = 5,
}

const LEVEL_TO_EMOJI = {
	[LogLevel.Trace]: "📝",
	[LogLevel.Debug]: "🐛",
	[LogLevel.Info]: "🔎",
	[LogLevel.Warn]: "⚠️",
	[LogLevel.Error]: "🔥",
} satisfies { [K in LogLevel]: string };

let defaultMaxLevel: LogLevel = LogLevel.Trace;
const maxLevelPerThread = new Map<thread, LogLevel>();

export function maxLevel(): LogLevel {
	return maxLevelPerThread.get(coroutine.running()) ?? defaultMaxLevel;
}

export function setDefaultMaxLevel(level: LogLevel) {
	defaultMaxLevel = level;
}

export function setMaxLevelForThread(level?: LogLevel, thread?: thread) {
	const t = thread ?? coroutine.running();
	if (level) maxLevelPerThread.set(t, level);
	else if (maxLevelPerThread.has(t)) maxLevelPerThread.delete(t);
}

export interface LoggerMetadata {
	level: LogLevel;
}

export interface LoggerRecord {
	metadata: LoggerMetadata;
	level: LogLevel;
	modulePath: string;
	args: defined[];
}

export interface Logger {
	enabled(metadata: LoggerMetadata): boolean;
	log(record: LoggerRecord): void;
	flush(): void;
}

export class SilentLogger implements Logger {
	enabled(): boolean {
		return false;
	}

	log(): void {}
	flush(): void {}
}

export interface RobloxLoggerProps {
	aliases?: { [pattern in string]: string };
}

export class RobloxLogger implements Logger {
	private aliases?: { [pattern in string]: string };

	constructor({ aliases }: RobloxLoggerProps) {
		this.aliases = aliases;
	}

	enabled(metadata: LoggerMetadata): boolean {
		// return metadata.level >= maxLevel();
		return true;
	}

	async log(record: LoggerRecord) {
		if (!this.enabled(record.metadata)) return;

		let modulePath = record.modulePath;
		if (this.aliases)
			for (const [p, a] of pairs(this.aliases)) {
				modulePath = modulePath.gsub(p, a)[0];
			}

		const msg =
			`${LEVEL_TO_EMOJI[record.level]} [${modulePath}] — ${record.args.map((v) => tostring(v)).join(" ")}`.gsub(
				"\n",
				"\n    ",
			)[0];

		switch (record.level) {
			case LogLevel.Error:
				task.spawn(error, msg, 0);
				break;
			case LogLevel.Warn:
				luaWarn(msg);
				break;
			default:
				print(msg);
		}
	}

	flush() {}
}

let defaultLogger: Logger = new SilentLogger();
const loggersPerThread = new Map<thread, Logger>();

export function logger(): Logger {
	return loggersPerThread.get(coroutine.running()) ?? defaultLogger;
}

export function setDefaultLogger(logger: Logger) {
	defaultLogger = logger;
}

export function setLoggerForThread(logger?: Logger, thread?: thread) {
	const t = thread ?? coroutine.running();
	if (logger) loggersPerThread.set(t, logger);
	else if (loggersPerThread.has(t)) loggersPerThread.delete(t);
}

function createLogFn(level: LogLevel) {
	return (...args: defined[]) => {
		const metadata = {
			level: level,
		} satisfies LoggerMetadata;

		let path = luaDebug.info(2, "s")[0] as string;
		// FIX in stories, the source is [string "ReplicatedStorage.script"] instead of ReplicatedStorage.script
		if (path.sub(1, 8) === "[string ") path = path.sub(10, -3);

		const record = {
			metadata: metadata,
			level: level,
			modulePath: path.gsub("%.", "/")[0],
			args: args,
		} satisfies LoggerRecord;

		logger().log(record);
	};
}

export const trace = createLogFn(LogLevel.Trace);
export const debug = createLogFn(LogLevel.Debug);
export const info = createLogFn(LogLevel.Info);
export const warn = createLogFn(LogLevel.Warn);
export const err = createLogFn(LogLevel.Error);
