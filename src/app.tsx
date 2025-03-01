// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Command } from "@rbxts/ethereal-for-plugins";
import Fusion, { Children, Computed, Out, peek, Value } from "@rbxts/fusion";
import { UsedAs } from "@rbxts/fusion/out/Types";
import { UserInputService } from "@rbxts/services";
import { VERSION } from "config";
import { commands, createCommandRun } from "core/commands";
import { scope, Scope, ScopeProps } from "scope";
import { Box } from "ui/components/Box";
import { CornerMid } from "ui/components/Corner";
import { ForPairs, Show } from "ui/components/Fusion";
import { Padding } from "ui/components/Padding";
import { Text, TEXT_STYLE_FONTS, TEXT_STYLE_PALLETE, TEXT_STYLE_SIZES, TextStyle } from "ui/components/Text";
import { TransparentBox } from "ui/components/TransparentBox";
import { pallete } from "ui/pallete";
import { FULL_UDIM_2, udim2Px, udim2Scale, udimPx, udimSqScale, ZERO_UDIM } from "ui/udim";
import { score } from "utils/fzy";

// Anything below this score usually doesn't include the query and often halves
// the results
const MINIMUM_SCORE = 2;

export interface CommandListingProps extends ScopeProps {
	command: Command;
	highlighted: UsedAs<boolean>;
	layoutOrder: UsedAs<number>;
	onActivated: () => void;
}

export function CommandListing({ scope, command, highlighted, layoutOrder, onActivated }: CommandListingProps) {
	const hover = scope.Value(false);
	return (
		<Box
			scope={scope}
			size={new UDim2(1, 0, 0, 32)}
			bg={scope.Computed((use, scope) => use(pallete(scope, use(hover) || use(highlighted) ? "bg" : "bgDark")))}
			onActivated={onActivated}
			onHoverStart={() => hover.set(true)}
			onHoverEnd={() => hover.set(false)}
			layoutOrder={layoutOrder}
		>
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<Padding scope={scope} paddingX={udimPx(6)} />
			<Text scope={scope} text={command.name} textStyle={TextStyle.Text} />
		</Box>
	);
}

export class App {
	private searchCache: Map<string, Command[]>;
	readonly searchInput: Value<string>;
	private listedCommands: Computed<Command[]>;
	readonly visible: Value<boolean>;

	private selectedIndex: Value<number>;
	private selectedCommand: Computed<Maybe<Command>>;

	constructor(private scope: Scope) {
		this.searchInput = scope.Value("");

		this.searchCache = new Map();
		scope.push(() => this.searchCache.clear());

		this.listedCommands = scope.Computed((use) => {
			const searchInput = use(this.searchInput);
			const searchInputLower = searchInput.lower();
			if (this.searchCache.has(searchInputLower)) return this.searchCache.get(searchInputLower)!;

			const filtered = use(commands)
				.filter((v) => score(searchInputLower, v.name.lower()) > MINIMUM_SCORE)
				.sort(
					(lhs, rhs) => score(lhs.name.lower(), searchInputLower) < score(rhs.name.lower(), searchInputLower),
				);

			this.searchCache.set(searchInputLower, filtered);
			return filtered;
		});

		this.selectedIndex = this.scope.Value(0);
		this.selectedCommand = this.scope.Computed((use) => use(this.listedCommands)[use(this.selectedIndex)]);

		this.scope.Observer(this.listedCommands).onBind(() => {
			const amountOfCommandsListed = peek(this.listedCommands).size();
			if (peek(this.selectedIndex) > amountOfCommandsListed) this.selectedIndex.set(amountOfCommandsListed);
		});

		this.scope.push(
			UserInputService.InputBegan.Connect((input, gameProcessed) => this.handleInput(input, gameProcessed)),
		);

		this.scope.Observer(this.selectedIndex).onBind(() => print("SELECTED INDEX", peek(this.selectedIndex)));
		this.scope
			.Observer(this.selectedCommand)
			.onBind(() => print("SELECTED COMMAND", peek(this.selectedCommand)?.name));

		this.visible = scope.Value(false);
	}

	handleInput(input: InputObject, gameProcessed: boolean) {
		if (input.KeyCode === Enum.KeyCode.Up)
			if (peek(this.selectedIndex) > 0) this.selectedIndex.set(peek(this.selectedIndex) - 1);
		if (input.KeyCode === Enum.KeyCode.Down)
			if (peek(this.selectedIndex) < peek(this.listedCommands).size() - 1)
				this.selectedIndex.set(peek(this.selectedIndex) + 1);
		if (input.KeyCode === Enum.KeyCode.Return) {
			const selectedCommand = peek(this.selectedCommand);
			if (selectedCommand) this.runCommand(selectedCommand);
		}
	}

	async runCommand(command: Command) {
		pcall(command.run, createCommandRun());
		this.visible.set(false);
	}

	render() {
		const searchTextBox = new Instance("TextBox");

		this.scope.Observer(this.visible).onBind(() => {
			if (peek(this.visible)) searchTextBox.CaptureFocus();
		});

		const visibility = this.scope.Spring(
			this.scope.Computed((use) => (use(this.visible) ? 0 : 1)),
			40,
			1,
		);

		return (
			<TransparentBox
				scope={this.scope}
				name="App"
				anchorPoint={new Vector2(0.5, 0.5)}
				position={udimSqScale(0.5)}
				size={udim2Px(640, 640)}
				visible={this.scope.Computed((use) => use(visibility) < 0.995)}
			>
				<uiscale scope={this.scope} Scale={this.scope.Computed((use) => 1 + 0.05 * use(visibility))} />
				<Box
					scope={this.scope}
					name="Container"
					bg={pallete(this.scope, "borderLight")}
					automaticSize={Enum.AutomaticSize.Y}
					size={udim2Scale(1, 0)}
				>
					<uilistlayout
						scope={this.scope}
						FillDirection={Enum.FillDirection.Vertical}
						SortOrder={Enum.SortOrder.LayoutOrder}
						Padding={udimPx(1)}
					/>
					<uistroke scope={this.scope} Color={pallete(this.scope, "borderLighter")} />
					<Box
						scope={this.scope}
						name="SearchBar"
						bg={pallete(this.scope, "bgDark")}
						size={new UDim2(1, 0, 0, 42)}
						layoutOrder={1}
					>
						<CornerMid scope={this.scope} />
						<frame
							scope={this.scope}
							Name="Cover"
							BackgroundColor3={pallete(this.scope, "bgDark")}
							Size={udim2Scale(1, 0.5)}
							Position={udim2Scale(0, 1)}
							AnchorPoint={new Vector2(0, 1)}
						/>
						<TransparentBox scope={this.scope} name="Container" size={FULL_UDIM_2}>
							<uilistlayout
								scope={this.scope}
								FillDirection={Enum.FillDirection.Horizontal}
								VerticalAlignment={Enum.VerticalAlignment.Center}
							/>
							<Padding scope={this.scope} paddingX={udimPx(12)} />
							{this.scope.Hydrate(searchTextBox)({
								BackgroundTransparency: 1,
								FontFace: TEXT_STYLE_FONTS[TextStyle.Text],
								TextSize: TEXT_STYLE_SIZES[TextStyle.Text],
								Size: udim2Scale(0, 1),
								PlaceholderText: "Search for commands...",
								PlaceholderColor3: pallete(this.scope, TEXT_STYLE_PALLETE[TextStyle.Text]),
								TextColor3: pallete(this.scope, "fg"),
								TextXAlignment: Enum.TextXAlignment.Left,
								TextYAlignment: Enum.TextYAlignment.Center,
								Text: this.searchInput,
								[Out("Text")]: this.searchInput,
								[Children]: <uiflexitem scope={this.scope} FlexMode={Enum.UIFlexMode.Fill} />,
							})}
						</TransparentBox>
					</Box>
					<Show
						scope={this.scope}
						when={scope.Computed((use) => use(this.listedCommands).size() > 0)}
						children={(scope) => {
							let childrenlayoutOrder = 1;

							return (
								<Box
									scope={this.scope}
									automaticSize={Enum.AutomaticSize.Y}
									bg={pallete(this.scope, "bgDark")}
									size={udim2Scale(1, 0)}
									layoutOrder={2}
								>
									<uilistlayout
										scope={this.scope}
										FillDirection={Enum.FillDirection.Vertical}
										SortOrder={Enum.SortOrder.LayoutOrder}
									/>
									<Padding scope={this.scope} paddingX={udimPx(6)} />
									<Text
										scope={this.scope}
										text="Results"
										textStyle={TextStyle.Label}
										padding={udimPx(6)}
										paddingBottom={ZERO_UDIM}
										layoutOrder={childrenlayoutOrder++}
									/>
									<ForPairs
										scope={this.scope}
										each={this.listedCommands as never as Map<number, Command>}
										children={(use, scope, index, command) =>
											$tuple(
												[],
												<CommandListing
													scope={scope}
													command={command}
													highlighted={scope.Computed(
														(use) => use(this.selectedCommand) === command,
													)}
													layoutOrder={childrenlayoutOrder + index}
													onActivated={() => this.runCommand(command)}
												/>,
											)
										}
									/>
								</Box>
							);
						}}
					/>
					<Box scope={this.scope} name="Footer" size={new UDim2(1, 0, 0, 32)} layoutOrder={3}>
						<CornerMid scope={this.scope} />
						<frame
							scope={this.scope}
							Name="Cover"
							BackgroundColor3={pallete(this.scope, "bg")}
							Size={udim2Scale(1, 0.5)}
						/>
						<TransparentBox scope={this.scope} name="Container" size={FULL_UDIM_2}>
							<uilistlayout
								scope={this.scope}
								FillDirection={Enum.FillDirection.Horizontal}
								VerticalAlignment={Enum.VerticalAlignment.Center}
							/>
							<Padding scope={this.scope} paddingX={udimPx(12)} />
							<Text scope={this.scope} text={`Et ${VERSION.toString()}`} textStyle={TextStyle.Text} />
						</TransparentBox>
					</Box>
					<CornerMid scope={this.scope} />
				</Box>
			</TransparentBox>
		);
	}
}
