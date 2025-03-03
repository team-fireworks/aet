// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { CoreCommand } from "core/types";
import { Connect } from "libs/event";
import { ScopeProps } from "scope";
import { Box } from "ui/components/Box";
import { CornerMid } from "ui/components/Corner";
import { ForPairs, Show } from "ui/components/Fusion";
import { Padding } from "ui/components/Padding";
import { Text, TextStyle } from "ui/components/Text";
import { TransparentBox } from "ui/components/TransparentBox";
import { pallete } from "ui/pallete";
import { udim2Scale, udimPx, udimSqPx, udimSqScale } from "ui/udim";
import { CommandListing } from "./CommandListing";
import { PalleteFooter } from "./PalleteFooter";
import { PalleteSearch } from "./PalleteSearch";

export interface CommandPalleteProps extends ScopeProps {
	visible: UsedAs<boolean>;

	searchInput: UsedAs<string>;
	onSearchChanged: (s: string) => void;
	onDoSearchFocus: Connect<[]>;
	onSearchFocusLost: () => void;

	listedCommands: UsedAs<CoreCommand[]>;
	selectedCommand: UsedAs<Maybe<CoreCommand>>;
	onCommandRun: (cmd: CoreCommand) => void;
}

export function CommandPallete({
	scope,

	visible,

	searchInput,
	onSearchChanged,
	onDoSearchFocus,
	onSearchFocusLost,

	listedCommands,
	selectedCommand,
	onCommandRun,
}: CommandPalleteProps) {
	return (
		<TransparentBox
			scope={scope}
			name="CommandPallete"
			anchorPoint={new Vector2(0.5, 0.5)}
			position={udimSqScale(0.5)}
			size={udimSqPx(640)}
			visible={visible}
		>
			<Box
				scope={scope}
				name="Container"
				bg={pallete(scope, "borderLight")}
				automaticSize={Enum.AutomaticSize.Y}
				size={udim2Scale(1, 0)}
			>
				<uilistlayout
					scope={scope}
					FillDirection={Enum.FillDirection.Vertical}
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={udimPx(1)}
				/>
				<uistroke scope={scope} Color={pallete(scope, "borderLighter")} />
				<CornerMid scope={scope} />
				<PalleteSearch
					scope={scope}
					text={searchInput}
					onTextChanged={onSearchChanged}
					onDoFocus={onDoSearchFocus}
					onFocusLost={onSearchFocusLost}
					layoutOrder={1}
				/>
				<Show
					scope={scope}
					when={scope.Computed((use) => use(listedCommands).size() > 0)}
					children={(scope) => {
						let childrenlayoutOrder = 1;

						return (
							<Box
								scope={scope}
								automaticSize={Enum.AutomaticSize.Y}
								bg={pallete(scope, "bgDark")}
								size={udim2Scale(1, 0)}
								layoutOrder={2}
							>
								<uilistlayout
									scope={scope}
									FillDirection={Enum.FillDirection.Vertical}
									SortOrder={Enum.SortOrder.LayoutOrder}
								/>
								<Padding scope={scope} paddingX={udimPx(6)} />
								<Text
									scope={scope}
									text="Results"
									textStyle={TextStyle.Label}
									padding={udimPx(6)}
									paddingBottom={udimPx(2)}
									layoutOrder={childrenlayoutOrder++}
								/>
								<ForPairs
									scope={scope}
									each={listedCommands as never as Map<number, CoreCommand>}
									children={(_, scope, index, command) =>
										$tuple(
											[],
											<CommandListing
												scope={scope}
												command={command}
												highlighted={scope.Computed((use) => use(selectedCommand) === command)}
												layoutOrder={childrenlayoutOrder + index}
												onMouseActivated={() => onCommandRun(command)}
											/>,
										)
									}
								/>
							</Box>
						);
					}}
				/>
				<PalleteFooter scope={scope} layoutOrder={3} />
			</Box>
		</TransparentBox>
	);
}
