// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs, Value } from "@rbxts/fusion";
import { CoreCommand } from "core/types";
import { ScopeProps } from "scope";
import { Box } from "ui/components/Box";
import { CornerMid } from "ui/components/Corner";
import { ForPairs, Show } from "ui/components/Fusion";
import { Padding } from "ui/components/Padding";
import { TransparentBox } from "ui/components/TransparentBox";
import { pallete } from "ui/pallete";
import { udim2Scale, udimPx, udimSqPx, udimSqScale } from "ui/udim";
import { CommandListing } from "./CommandListing";
import { PalleteFooter } from "./PalleteFooter";
import { PalleteSearch } from "./PalleteSearch";

export interface CommandPalleteProps extends ScopeProps {
	visible: UsedAs<boolean>;

	searchInput: UsedAs<string>;
	onSearchInputChanged: (s: string) => void;
	refInput: Value<TextBox>;

	listedCommands: UsedAs<CoreCommand[]>;
	selectedCommand: UsedAs<Maybe<CoreCommand>>;
	onCommandRun: (cmd: CoreCommand) => void;
}

export function CommandPallete({
	scope,

	visible,

	searchInput,
	onSearchInputChanged,
	refInput,

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
					searchInput={searchInput}
					onInputChanged={onSearchInputChanged}
					refInput={refInput}
					layoutOrder={1}
				/>
				<Show
					scope={scope}
					when={scope.Computed((use) => use(listedCommands).size() > 0)}
					children={(scope) => {
						// FIXME: mfw automaticsize doesnt work with
						// uisizeconstraint so i have to pull this bs
						const commandListingsAbsoluteSize = scope.Value(Vector2.zero);
						const commandListingsSize = scope.Spring(
							scope.Computed(
								(use) => new UDim2(1, 0, 0, math.clamp(use(commandListingsAbsoluteSize).Y, 0, 320)),
							),
							50,
							1.1,
						);

						let childrenlayoutOrder = 1;

						return (
							<scrollingframe
								scope={scope}
								BackgroundColor3={pallete(scope, "bgDark")}
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
										each={listedCommands as never as Map<number, CoreCommand>}
										children={(_, scope, index, command) =>
											$tuple(
												[],
												<CommandListing
													scope={scope}
													command={command}
													highlighted={scope.Computed(
														(use) => use(selectedCommand) === command,
													)}
													layoutOrder={childrenlayoutOrder + index}
													onMouseActivated={() => onCommandRun(command)}
												/>,
											)
										}
									/>
								</TransparentBox>
							</scrollingframe>
						);
					}}
				/>
				<PalleteFooter scope={scope} layoutOrder={3} />
			</Box>
		</TransparentBox>
	);
}
