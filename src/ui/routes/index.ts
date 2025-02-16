// From Ethereal, licensed under the GNU General Public License v3.0
// Based on https://github.com/roblaudio/ocmusic-browser/blob/main/src/client/ui/routes/index.ts

import { Child, Contextual, Value } from "@rbxts/fusion";
import { fontAwesome, Icon } from "ui/components/icons";
import { scope, Scoped } from "ui/scoped";
import { Kits } from "./kits";
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
	images: {
		label: "Images",
		render: noop,
		icon: fontAwesome.image,
	},
	sounds: {
		label: "Sounds",
		render: noop,
		icon: fontAwesome.soundFull,
	},
	clientObjects: {
		label: "Client Objects",
		render: noop,
		icon: fontAwesome.wandMagicSparkles,
	},
	kits: {
		label: "Kits",
		render: Kits,
		icon: fontAwesome.toolbox,
	},
	settings: {
		label: "Settings",
		render: Settings,
		icon: fontAwesome.gear,
	},
} satisfies Record<string, Route>;

export type RouteKey = keyof typeof ROUTES;

export const NAV_ROUTES: RouteKey[] = ["tools", "images", "sounds", "clientObjects", "kits", "settings"];

export const currentRouteContext = Contextual(scope.Value<Route>(ROUTES.tools));
export function unwrapRouteContext(): Value<Route> {
	return currentRouteContext.now();
}
