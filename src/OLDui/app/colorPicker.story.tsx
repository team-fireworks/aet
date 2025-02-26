// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import { Button, ButtonStyle } from "ui/components/button";
import { fusionStory } from "uilabs";
import { ColorPicker } from "./colorPicker";

export = fusionStory({
	story: ({ scope }) => {
		// NOTE: ColorPicker creates a widget which yields which breaks UI Labs,
		// so we spawn a new thread.
		//
		// See the ROSS thread:
		// https://discord.com/channels/385151591524597761/1234734352609316894/1343075400607076404
		let colorPicker: ColorPicker;
		scope.spawnTask((scope) => (colorPicker = new ColorPicker(scope)), scope);
		return (
			<Button
				scope={scope}
				label="Open Color Picker"
				style={ButtonStyle.Primary}
				onClick={() => {
					if (colorPicker) colorPicker.toggle();
				}}
			/>
		);
	},
});
