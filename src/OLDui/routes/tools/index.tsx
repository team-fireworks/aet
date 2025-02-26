// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import Object from "@rbxts/object-utils";
import { tools } from "lib";
import { Scoped } from "scoped";
import { ForValues } from "ui/components/fusion";
import { Padding } from "ui/components/padding";
import { Scroller } from "ui/components/scroller";
import { TextInput } from "ui/components/textInput";
import { ToolListing } from "ui/routes/tools/listing";

export function Tools({ scope }: Scoped) {
	const search = scope.Value("");

	return (
		<Scroller scope={scope} automaticSize={Enum.AutomaticSize.Y} size={UDim2.fromScale(1, 1)} name="Tools">
			<uilistlayout scope={scope} FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 4)} />
			<Padding scope={scope} padding={new UDim(0, 6)} paddingRight={new UDim(0, 24)} />
			<TextInput
				scope={scope}
				value={search}
				placeholder={"Search"}
				automaticSize={Enum.AutomaticSize.Y}
				size={UDim2.fromScale(1, 0)}
			/>
			<ForValues
				scope={scope}
				each={scope.Computed((use) => Object.keys(use(tools)).sort((lhs, rhs) => lhs.name < rhs.name))}
				children={(_, scope, v) => <ToolListing scope={scope} tool={v} />}
			/>
		</Scroller>
	);
}
