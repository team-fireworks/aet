// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import { choose, fusionStory } from "uilabs";
import { Button, ButtonStyle } from "./button";

export = fusionStory({
	controls: {
		label: "Hello",
		buttonStyle: choose(["Primary", "Secondary"]),
		buttonSize: choose(["Large", "Medium", "Small"], 1),
		alignX: choose(["Left", "Center", "Right"], 1),
	},
	story: ({ scope, controls }) => <Button scope={scope} style={ButtonStyle.Primary} label={controls.label} />,
});
