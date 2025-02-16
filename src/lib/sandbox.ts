import { info } from "log";
import { LibTool } from "./types";

export function createToolSandbox(tool: LibTool) {
	const fullName = `@${tool.source.name}/${tool.name}`;

	const SANDBOX_ENVIRONMENT = {
		plugin: setmetatable({} as Plugin, {
			__metatable: "This metatable is locked.",
			__index: () => {
				throw `${tool.name} (${fullName}) attempted to access the Ethereal plugin instance.`;
			},
			__newindex: () => {
				throw `${tool.name} (${fullName}) attempted to access the Ethereal plugin instance.`;
			},
		}),

		print: (...args: defined[]) => info(`${tool.name} (${fullName}): ${args.map((v) => tostring(v)).join(" ")}`),
		warn: (...args: defined[]) => warn(`${tool.name} (${fullName}): ${args.map((v) => tostring(v)).join(" ")}`),
		error: error,

		require: () => {
			throw "not yet sandboxed";
		},

		setfenv: () => {
			throw "not yet sandboxed";
		},

		getfenv: () => {
			throw "not yet sandboxed";
		},
	};

	return SANDBOX_ENVIRONMENT;
}
