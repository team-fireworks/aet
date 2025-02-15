// From Ethereal, licenced under The 3-Clause BSD License.
// Based on https://github.com/roblaudio/ocmusic-browser/blob/main/src/client/ui/routes/index.ts

import { Child, Contextual, Value } from "@rbxts/fusion";
import { fontAwesome, Icon } from "ui/components/icons";
import { scope, Scoped } from "ui/scoped";
import { Resources } from "./resources";
import { Settings } from "./settings";
import { Tools } from "./tools";

export interface Route {
	label: string;
	render: (props: Scoped) => Child;
	icon?: Icon;
}

export function noop(_: Scoped): Child {
	return [];
}

export const ROUTES = {
	tools: {
		label: "Tools",
		render: Tools,
		icon: fontAwesome.wrench,
	},
	resources: {
		label: "Resources",
		render: Resources,
		icon: fontAwesome.swatchbook,
	},
	settings: {
		label: "Settings",
		render: Settings,
		icon: fontAwesome.gear,
	},
} satisfies Record<string, Route>;

export type RouteKey = keyof typeof ROUTES;

export const NAV_ROUTES: RouteKey[] = ["tools", "resources", "settings"];

export const currentRouteContext = Contextual(scope.Value<Route>(ROUTES.tools));
export function unwrapRouteContext(): Value<Route> {
	return currentRouteContext.now();
}
