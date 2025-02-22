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
import { Scoped } from "scoped";
import { Heading } from "ui/components/heading";
import { Padding } from "ui/components/padding";

// interface KitGrouped {
// 	kind: "group";
// 	label: string;
// 	description: string;
// 	kits: Omit<Kit, "description">[];
// }

// interface Kit {
// 	kind: "kit";
// 	label: string;
// 	description: string;
// 	thumbnailAsset: string;
// 	authorIds: number[];
// }

// const KITS: (KitGrouped | Kit)[] = [
// 	{
// 		kind: "group",
// 		label: "Ethereal",
// 		description: "string",
// 		kits: [
// 			{
// 				kind: "kit",
// 			},
// 		],
// 	},
// ];

export function Kits({ scope }: Scoped) {
	return (
		<scrollingframe
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			Size={UDim2.fromScale(1, 0)}
		>
			<uilistlayout scope={scope} FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 4)} />
			<Padding scope={scope} padding={new UDim(0, 6)} paddingRight={new UDim(0, 24)} />
			<Heading scope={scope} text="Tower Kits" />
		</scrollingframe>
	);
}
