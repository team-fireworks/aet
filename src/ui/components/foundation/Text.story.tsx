// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { peek } from "@rbxts/fusion";
import { choose, fusionStory } from "ui/uilabs";
import { Text, TextStyle } from "./Text";

const STORY_TEXT_STYLES: Array<[label: string, value: TextStyle]> = [
	["Title", TextStyle.Title],
	["Subtitle", TextStyle.Subtitle],
	["Text", TextStyle.Text],
	["Label", TextStyle.Label],
];

const MAP_STORY_TEXT_STYLES = new Map(STORY_TEXT_STYLES);

const TOCAV_WIKI_PAGE =
	"Tower of Complexity and Volatility (ToCaV) is a Terrifying difficulty, ascension-based " +
	"Tower located in Zone 10. It was made by Miantoz1980, ImNotFireMan123 and " +
	"ConfirmedIlluminatix. This tower is known for its time manipulation gimmicks. It can be " +
	"played in its own place here.";

export = fusionStory({
	controls: {
		text: TOCAV_WIKI_PAGE,
		textStyle: choose(STORY_TEXT_STYLES.map(([v]) => v)),
		textAlignX: choose(["left", "center", "right"], 0),
		textAlignY: choose(["top", "center", "bottom"], 0),
	},
	story: ({ scope, controls }) => {
		scope.Observer(controls.textStyle).onBind(() => print(`TEXT STYLE: ${peek(controls.textStyle)}`));
		return (
			<Text
				scope={scope}
				text={controls.text}
				textStyle={scope.Computed((use) => MAP_STORY_TEXT_STYLES.get(use(controls.textStyle))!)}
				textAlignX={controls.textAlignX as never}
				textAlignY={controls.textAlignY as never}
			/>
		);
	},
});
