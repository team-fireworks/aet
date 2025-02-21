// // Eternal is a full-featured companion plugin for Eternal Towers of Hell
// // Copyright (C) 2025 znotfireman
// //
// // This program is free software: you can redistribute it and/or modify it unde
// // the terms of the GNU General Public License as published by the Free Software
// // Foundation, either version 3 of the License, or (at your option) any later
// // version.
// //
// // This program is distributed in the hope that it will be useful, but WITHOUT
// // ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// // FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// // details.
// //
// // You should have received a copy of the GNU General Public License along with
// // this program. If not, see <https://www.gnu.org/licenses/>.

// import { info } from "log";
// import type { LibTool } from "./types";

// export function createToolSandbox(tool: LibTool) {
// 	const fullName = `@${tool.source.name}/${tool.name}`;

// 	const SANDBOX_ENVIRONMENT = {
// 		plugin: setmetatable({} as Plugin, {
// 			__metatable: "This metatable is locked.",
// 			__index: () => {
// 				throw `${tool.name} (${fullName}) attempted to access the Ethereal plugin instance.`;
// 			},
// 			__newindex: () => {
// 				throw `${tool.name} (${fullName}) attempted to access the Ethereal plugin instance.`;
// 			},
// 		}),

// 		print: (...args: defined[]) => info(`${tool.name} (${fullName}): ${args.map((v) => tostring(v)).join(" ")}`),
// 		warn: (...args: defined[]) => warn(`${tool.name} (${fullName}): ${args.map((v) => tostring(v)).join(" ")}`),
// 		error: error,

// 		require: () => {
// 			throw "not yet sandboxed";
// 		},

// 		setfenv: () => {
// 			throw "not yet sandboxed";
// 		},

// 		getfenv: () => {
// 			throw "not yet sandboxed";
// 		},
// 	};

// 	return SANDBOX_ENVIRONMENT;
// }
