// Eternal is a full-featured companion plugin for Eternal Towers of Hell.
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

import { ExternalDebug, Scope } from "@rbxts/fusion";
import Iris from "@rbxts/iris";
import { Workspace } from "@rbxts/services";
import { info } from "log";
import { scope } from "scoped";
import { tree, window } from "./iris";

export function createDebug(rootTrace: string) {
	const pathToFusion = rootTrace + ".include.node_modules.@rbxts.fusion.out";
	const pathAliases: Array<[pattern: string, replacement: string]> = [
		[pathToFusion, "Fusion"],
		[rootTrace + ".include.node_modules.@rbxts", "@rbxts"],
		[rootTrace, "@ethereal"],
	];

	function aliasPath(path: string): string {
		for (const [pattern, replacement] of pathAliases) {
			path = path.gsub(pattern, replacement)[0];
		}
		return path;
	}

	const scopeOwners = new Map<Scope, string>();

	ExternalDebug.setDebugger({
		startDebugging: () => {
			info(`Started Fusion debugger`);
		},

		stopDebugging: () => {
			info(`Stopping Fusion debugger`);
		},

		trackScope: (scope) => {
			let index = 0;
			let [callerSource] = debug.info(index, "s");

			while (true) {
				index++;
				const newSource = debug.info(index, "s")[0];
				if (!newSource) break;
				callerSource = newSource;
			}

			if (callerSource) scopeOwners.set(scope, aliasPath(callerSource));
		},

		untrackScope: (scope) => {
			scopeOwners.delete(scope);
		},
	});

	let firstRun = true;

	function getScopeOwner(scope: Scope): Maybe<string> {
		let owner = scopeOwners.get(scope);
		if (!owner) return undefined;

		for (const [pattern, replacement] of pathAliases) {
			owner = owner.gsub(pattern, replacement)[0];
		}

		return owner;
	}

	// let totalFunctions = 0;
	// let totalInstances = 0;
	// let totalConnections = 0;
	// let totalObjects = 0;
	// let totalScopes = 0;

	function createScopeTree(scope: Scope) {
		// totalScopes += 1;
		tree([`Scope owned by ${getScopeOwner(scope) ?? "unknown"}`], () => {
			for (const v of scope) {
				if (typeIs(v, "function")) {
					// totalFunctions += 1;
					let [source, name] = debug.info(v, "sn");
					Iris.Text([`➡️ ${name || "anonymous"} owned by ${aliasPath(source).gsub("%.", "/")[0]}`]);
				} else if (typeIs(v, "RBXScriptConnection")) {
					// totalConnections += 1;
					Iris.Text([`⚡️ RBXScriptConnection`]);
				} else if (typeIs(v, "Instance")) {
					// totalInstances += 1;
					Iris.Text([`🖼️ ${v.Name}`]);
				} else if (typeIs(v, "table") && (v as never)[0] !== undefined) {
					createScopeTree(v as Scope);
				} else {
					// totalObjects += 1;
					Iris.Text([`📦 ${tostring(v)}`]);
				}
			}
		});
	}

	return () => {
		const debugWindow = window(["Ethereal Debug"], () => {
			// menuBar(() => {
			// 	menu([""], () => {
			Iris.PushConfig({ ItemSpacing: new Vector2(0, 0) });
			createScopeTree(scope);
			Iris.PopConfig();

			// sameline([], () => {
			// 	Iris.Text([`${totalScopes} scopes`]);
			// 	Iris.Text([`${totalFunctions} functions`]);
			// 	Iris.Text([`${totalInstances} instances`]);
			// 	Iris.Text([`${totalConnections} connections`]);
			// 	Iris.Text([`${totalObjects} objects`]);
			// });

			// totalFunctions = 0;
			// totalInstances = 0;
			// totalConnections = 0;
			// totalObjects = 0;
			// totalScopes = 0;
			// 	});
			// });
		});

		if (firstRun) {
			debugWindow.state.position.set(Vector2.zero);
			debugWindow.state.size.set(Workspace.CurrentCamera!.ViewportSize);
			debugWindow.state.isUncollapsed.set(false);
			firstRun = false;
		}
	};
}
