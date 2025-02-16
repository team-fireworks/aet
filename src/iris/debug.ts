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
