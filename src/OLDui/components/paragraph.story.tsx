// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

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
