// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import { fusionStory } from "uilabs";
import { TowerSelector } from "./towerSelector";

export = fusionStory({
	story: ({ scope }) => {
		const isSelecting = scope.Value(false);
		return <TowerSelector scope={scope} isSelecting={isSelecting} onClick={() => {}} onDeselected={() => {}} />;
	},
});
