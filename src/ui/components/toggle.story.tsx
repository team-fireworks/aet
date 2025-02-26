// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

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
