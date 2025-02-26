// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { peek } from "@rbxts/fusion";
import { RobloxLogger, setDefaultLogger } from "log";
import { fusionStory } from "uilabs";
import { TextInput } from "./textInput";

export = fusionStory({
	controls: {
		placeholder: "Type here",
	},
	story: ({ controls, scope }) => {
		setDefaultLogger(new RobloxLogger({}));

		const value = scope.Value("");
		scope.Observer(value).onBind(() => `TextInput value: ${peek(value)}`);
		return (
			<TextInput
				scope={scope}
				placeholder={controls.placeholder}
				value={value}
				size={UDim2.fromOffset(128, 24)}
			/>
		);
	},
});
