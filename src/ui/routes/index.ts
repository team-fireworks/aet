// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.
// Based on https://github.com/roblaudio/ocmusic-browser/blob/main/src/client/ui/routes/index.ts

import { Child, Contextual, Value } from "@rbxts/fusion";
import { scope, Scoped } from "scoped";
import { fontAwesome, Icon } from "ui/components/icons";
import { Kits } from "./kits";
import { Placeholder } from "./placeholder";
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
	meshes: {
		label: "Meshes",
		render: Placeholder,
		icon: fontAwesome.soundFull,
	},
	images: {
		label: "Images",
		render: Placeholder,
		icon: fontAwesome.image,
	},
	sounds: {
		label: "Sounds",
		render: Placeholder,
		icon: fontAwesome.soundFull,
	},
	effects: {
		label: "Effects",
		render: Placeholder,
		icon: fontAwesome.soundFull,
	},
	clientObjects: {
		label: "Client Objects",
		render: Placeholder,
		icon: fontAwesome.wandMagicSparkles,
	},
	kits: {
		label: "Kits",
		render: Kits,
		icon: fontAwesome.toolbox,
	},
	settings: {
		label: "Settings",
		render: Placeholder,
		icon: fontAwesome.gear,
	},
} satisfies Record<string, Route>;

export type RouteKey = keyof typeof ROUTES;

export const NAV_ROUTES: RouteKey[] = ["tools", "images", "sounds", "clientObjects", "kits", "settings"];

export const currentRouteContext = Contextual(scope.Value<Route>(ROUTES.tools));
export function unwrapRouteContext(): Value<Route> {
	return currentRouteContext.now();
}
