// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { getCommandPredicateResult } from "lib/commands";
import { ScopeProps } from "scope";
import { LibCommand } from "types";
import { ForPairs } from "ui/components/foundation/Fusion";
import { Padding } from "ui/components/foundation/Padding";
import { TransparentBox } from "ui/components/foundation/TransparentBox";
import { CommandListing } from "ui/components/palette/CommandListing";
import { palette } from "ui/palette";
import { udim2Scale, udimPx } from "ui/udim";

export interface CommandListProps extends ScopeProps {
	commands: UsedAs<LibCommand[]>;
	selectedCommand: UsedAs<Maybe<LibCommand>>;
	onRunCommand: (cmd: LibCommand) => void;
}

export function CommandList({ scope, commands, selectedCommand, onRunCommand }: CommandListProps) {
	// FIXME: mfw automaticsize doesnt work with
	// uisizeconstraint so i have to pull this bs
	const commandListingsAbsoluteSize = scope.Value(Vector2.zero);
	const commandListingsSize = scope.Spring(
		scope.Computed((use) => new UDim2(1, 0, 0, math.clamp(use(commandListingsAbsoluteSize).Y, 0, 320))),
		50,
		1.1,
	);

	let childrenlayoutOrder = 1;

	return (
		<scrollingframe
			scope={scope}
			BackgroundColor3={palette(scope, "bgDark")}
			ClipsDescendants
			AutomaticCanvasSize={Enum.AutomaticSize.Y}
			ScrollingDirection={Enum.ScrollingDirection.Y}
			CanvasSize={udim2Scale(1, 0)}
			Size={commandListingsSize}
			VerticalScrollBarInset={Enum.ScrollBarInset.Always}
			LayoutOrder={2}
		>
			<TransparentBox
				scope={scope}
				automaticSize={Enum.AutomaticSize.Y}
				size={udim2Scale(1, 0)}
				outSize={commandListingsAbsoluteSize}
			>
				<uilistlayout
					scope={scope}
					FillDirection={Enum.FillDirection.Vertical}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<Padding scope={scope} padding={udimPx(6)} />
				{/* <Text
										scope={scope}
										text="Results"
										textStyle={TextStyle.Label}
										paddingX={udimPx(6)}
										paddingY={ZERO_UDIM}
										paddingBottom={udimPx(4)}
										layoutOrder={childrenlayoutOrder++}
									/> */}
				<ForPairs
					scope={scope}
					each={commands as never as Map<number, LibCommand>}
					children={(_, scope, index, cmd) =>
						$tuple(
							[],
							<CommandListing
								scope={scope}
								command={cmd}
								enabled={scope.Computed((use) => getCommandPredicateResult(use, cmd).ok)}
								highlighted={scope.Computed((use) => use(selectedCommand) === cmd)}
								layoutOrder={childrenlayoutOrder + index}
								onMouseActivated={() => onRunCommand(cmd)}
							/>,
						)
					}
				/>
			</TransparentBox>
		</scrollingframe>
	);
}
