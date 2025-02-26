// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion from "@rbxts/fusion";
import { Selection, Workspace } from "@rbxts/services";
import { Kit, KITS } from "kits";
import { Scoped } from "scoped";
import { Button, ButtonStyle } from "ui/components/button";
import { List } from "ui/components/constraints";
import { ForValues, Show } from "ui/components/fusion";
import { etoh, Icon } from "ui/components/icons";
import { Muted } from "ui/components/muted";
import { Padding } from "ui/components/padding";
import { Pane, TransparentPane } from "ui/components/panes";
import { Paragraph } from "ui/components/paragraph";
import { Scroller } from "ui/components/scroller";
import { FULL_UDIM_2, udim2Scale, udimPx, udimSqPx, ZERO_UDIM } from "ui/udims";

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
	const display = scope.Value<Kit | undefined>(undefined);

	return (
		<Scroller scope={scope} size={FULL_UDIM_2}>
			<List scope={scope} direction={Enum.FillDirection.Vertical} padding={udimPx(4)} />
			<Padding scope={scope} padding={udimPx(6)} paddingRight={udimPx(24)} />
			{/* <Heading scope={scope} text="Tower Kits" layoutOrder={1} /> */}
			<Show
				scope={scope}
				when={scope.Computed((use) => use(display) !== undefined)}
				children={(scope) => (
					// TODO: swap this out for a fragment
					<TransparentPane scope={scope} automaticSize={Enum.AutomaticSize.XY} layoutOrder={2}>
						<List scope={scope} direction={Enum.FillDirection.Vertical} />
						<ForValues
							scope={scope}
							each={scope.Computed((use) => use(display)!.kits)}
							children={(use, scope, k) => (
								<Pane scope={scope}>
									<Paragraph scope={scope} text={k.name} rich padding={ZERO_UDIM} />
									<List scope={scope} direction={Enum.FillDirection.Vertical} />
									<Button
										scope={scope}
										style={ButtonStyle.Primary}
										label="Insert"
										onClick={() => {
											const insertedKit = k.insert();
											insertedKit.Parent = Workspace;
											Selection.Set([insertedKit]);
										}}
									/>
								</Pane>
							)}
						/>
					</TransparentPane>
				)}
				fallback={(scope) => (
					<ForValues
						scope={scope}
						each={KITS}
						children={(_, scope, kits) => (
							<Pane
								scope={scope}
								automaticSize={Enum.AutomaticSize.Y}
								size={udim2Scale(1, 0)}
								layoutOrder={2}
								onClick={() => display.set(kits)}
							>
								<List
									scope={scope}
									direction={Enum.FillDirection.Horizontal}
									alignY={Enum.VerticalAlignment.Center}
									padding={udimPx(4)}
								/>
								<Icon scope={scope} icon={etoh} size={udimSqPx(36)} />
								<TransparentPane scope={scope} automaticSize={Enum.AutomaticSize.XY}>
									<List scope={scope} direction={Enum.FillDirection.Vertical} />
									<Paragraph scope={scope} text={kits.name} rich padding={ZERO_UDIM} />
									<Muted scope={scope} text={`${kits.kits.size()} kits`} padding={ZERO_UDIM} />
								</TransparentPane>
							</Pane>
						)}
					/>
				)}
			/>
		</Scroller>
	);
}
