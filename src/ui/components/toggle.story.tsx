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

import Fusion, { peek } from "@rbxts/fusion";
import { debug, RobloxLogger, setDefaultLogger } from "log";
import { fusionStory } from "uilabs";
import { Toggle } from "./toggle";

export = fusionStory({
	story: ({ scope }) => {
		setDefaultLogger(new RobloxLogger({}));
		const toggled = scope.Value(false);
		scope.Observer(toggled).onBind(() => debug(peek(toggled) ? "Is toggled" : "Not toggled"));
		return <Toggle scope={scope} toggled={toggled} onToggle={() => toggled.set(!peek(toggled))} />;
	},
});
