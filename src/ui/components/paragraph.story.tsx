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

import Fusion from "@rbxts/fusion";
import { fusionStory } from "uilabs";
import { Paragraph } from "./paragraph";

export = fusionStory({
	controls: {
		text:
			"Tower of Complexity and Volatility (ToCaV) is a Terrifying " +
			"difficulty, ascension-based Tower located in Zone 10. It was " +
			"made by Miantoz1980, ImNotFireMan123 and ConfirmedIlluminatix. " +
			"This tower is known for its time manipulation gimmicks. It can " +
			"be played in its own place here.",
		rich: true,
		textWrapped: true,
	},
	story: ({ scope, controls }) => (
		<Paragraph scope={scope} text={controls.text} textWrapped={controls.textWrapped} rich={controls.rich} />
	),
});
