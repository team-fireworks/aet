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
// Based on https://github.com/roblaudio/ocmusic-browser/blob/main/src/client/ui/routes/index.ts

import { Child, Contextual, Value } from "@rbxts/fusion";
import { scope, Scoped } from "scoped";
import { fontAwesome, Icon } from "ui/components/icons";
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
