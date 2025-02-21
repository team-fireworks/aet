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
import { info } from "log";
import { accordion, tree, window } from "./iris";

export function createDebug() {
	const trackedScopes = new WeakSet<Scope>();

	ExternalDebug.setDebugger({
		startDebugging: () => {
			info(`Started Fusion debugger`);
		},

		stopDebugging: () => {
			info(`Stopping Fusion debugger`);
		},

		trackScope: (scope) => {
			trackedScopes.add(scope);
		},

		untrackScope: (scope) => {
			trackedScopes.delete(scope);
		},
	});

	let firstRun = true;
	return () => {
		const debugWindow = window(["Ethereal Debug"], () => {
			accordion(["Scopes"], () => {
				Iris.Text([`${trackedScopes.size()} scopes`]);
				for (const s of trackedScopes) {
					tree([`Scope (${s.size()} tasks)`], () => {
						Iris.Text([s.map((v) => tostring(v)).join("\n")]);
					});
					// print(s);
				}
			});
		});

		if (firstRun) {
			debugWindow.state.position.set(Vector2.zero);
			debugWindow.state.isUncollapsed.set(false);
			firstRun = false;
		}
	};
}
