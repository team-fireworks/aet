// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs, Value } from "@rbxts/fusion";
import { LibCommand } from "lib/types";
import { ScopeProps } from "scope";
import { Box } from "ui/components/foundation/Box";
import { CornerMid } from "ui/components/foundation/Corner";
import { Show } from "ui/components/foundation/Fusion";
import { TransparentBox } from "ui/components/foundation/TransparentBox";
import { CommandList } from "ui/components/pallete/CommandList";
import { CommandPalleteFooter } from "ui/components/pallete/CommandPalleteFooter";
import { CommandPalleteSearch } from "ui/components/pallete/CommandPalleteSearch";
import { pallete } from "ui/pallete";
import { udim2Scale, udimPx, udimSqPx, udimSqScale } from "ui/udim";

export interface CommandPalleteProps extends ScopeProps {
	visible: UsedAs<boolean>;

	searchInput: UsedAs<string>;
	onSearchInputChanged: (s: string) => void;
	refSearchInput: Value<Maybe<TextBox>>;

	suggestedCommands: UsedAs<LibCommand[]>;
	selectedCommand: UsedAs<Maybe<LibCommand>>;
	onRunCommand: (cmd: LibCommand) => void;
}

export function CommandPallete({
	scope,

	visible,

	searchInput,
	onSearchInputChanged,
	refSearchInput,

	suggestedCommands,
	selectedCommand,
	onRunCommand,
}: CommandPalleteProps) {
	const visibility = scope.Spring(
		scope.Computed((use) => (use(visible) ? 0 : 1)),
		50,
		1,
	);

	const isVisible = scope.Computed((use) => use(visibility) < 0.995);

	return (
		<TransparentBox
			scope={scope}
			name="CommandPallete"
			anchorPoint={new Vector2(0.5, 0.5)}
			position={udimSqScale(0.5)}
			size={udimSqPx(640)}
			visible={isVisible}
		>
			<uiscale scope={scope} Scale={scope.Computed((use) => 1 + 0.025 * use(visibility))} />
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
				<CommandPalleteSearch
					scope={scope}
					searchInput={searchInput}
					onSearchInputChanged={onSearchInputChanged}
					refSearchInput={refSearchInput}
					layoutOrder={1}
				/>
				{/*
				    TODO: swap this out for a switch computed when we implement
					views
				*/}
				<Show
					scope={scope}
					when={scope.Computed((use) => use(suggestedCommands).size() > 0)}
					children={(scope) => (
						<CommandList
							scope={scope}
							commands={suggestedCommands}
							selectedCommand={selectedCommand}
							onRunCommand={onRunCommand}
						/>
					)}
				/>
				<CommandPalleteFooter scope={scope} layoutOrder={3} />
			</Box>
		</TransparentBox>
	);
}
