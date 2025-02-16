// From Ethereal, licensed under the GNU General Public License v3.0

import Fusion from "@rbxts/fusion";
import { Heading } from "ui/components/foundational/heading";
import { Padding } from "ui/components/foundational/padding";
import { Scoped } from "ui/scoped";

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
