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
import Object from "@rbxts/object-utils";
import { tools } from "lib";
import { Scoped } from "scoped";
import { ForValues } from "ui/components/fusion";
import { Padding } from "ui/components/padding";
import { Scroller } from "ui/components/scroller";
import { ToolListing } from "ui/routes/tools/listing";

export function Tools({ scope }: Scoped) {
	return (
		<Scroller scope={scope} automaticSize={Enum.AutomaticSize.Y} size={UDim2.fromScale(1, 1)} name="Tools">
			<uilistlayout scope={scope} FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 4)} />
			<Padding scope={scope} padding={new UDim(0, 6)} paddingRight={new UDim(0, 24)} />
			<ForValues
				scope={scope}
				each={scope.Computed((use) => Object.keys(use(tools)).sort((lhs, rhs) => lhs.name < rhs.name))}
				children={(_, scope, v) => <ToolListing scope={scope} tool={v} />}
			/>
		</Scroller>
	);
}
