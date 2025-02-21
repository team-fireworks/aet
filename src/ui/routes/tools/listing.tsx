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

import Fusion, { Child, peek, UsedAs } from "@rbxts/fusion";
import assets from "assets";
import { LibAction, LibTool } from "lib";
import { Scoped } from "scoped";
import { Button, ButtonStyle } from "ui/components/foundational/button";
import { HintContainer } from "ui/components/foundational/hint";
import { Muted } from "ui/components/foundational/muted";
import { Padding } from "ui/components/foundational/padding";
import { Paragraph } from "ui/components/foundational/paragraph";
import { Round } from "ui/components/foundational/round";
import { Toggle } from "ui/components/foundational/toggle";
import { ForPairs, ForValues, Show } from "ui/components/fusion";
import { fontAwesome, Icon } from "ui/components/icons";
import { theme } from "ui/theme";

const TOOL_LISTING_COLLAPSED_HEIGHT = 32;

export interface ToolListingProps extends Scoped {
	tool: UsedAs<LibTool>;
}

export function ToolListing({ scope, tool }: ToolListingProps) {
	const collapsed = scope.Value(false);
	const collapsedSpring = scope.computedSpring((use) => (use(collapsed) ? 1 : 0));
	const hover = scope.Value(false);
	const contentAbsoluteSize = scope.Value(Vector2.zero);

	const thisActions = scope.Computed((use) => use(tool)._actions);

	const buttons = (
		<ForPairs
			scope={scope}
			// ???
			each={thisActions as never as Map<number, LibAction>}
			children={(_, scope, index, { label, onClickCallbacks }) =>
				$tuple(
					[],
					<Button
						scope={scope}
						style={ButtonStyle.Primary}
						label={label}
						layoutOrder={index}
						onClick={() => {
							for (const v of onClickCallbacks) task.spawn(v);
						}}
					/>,
				)
			}
		/>
	);

	return (
		<frame
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={theme(scope, "bgLight")}
			ClipsDescendants={false}
			Name={scope.Computed((use) => use(`ToolListing(${use(tool).name})`))}
			Size={UDim2.fromScale(1, 0)}
			OnEvent:MouseEnter={() => hover.set(true)}
			OnEvent:MouseLeave={() => hover.set(false)}
		>
			<Round scope={scope} radius={new UDim(0, 6)} />
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Vertical}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<uistroke scope={scope} Color={theme(scope, "border")} />
			<imagebutton
				scope={scope}
				Size={new UDim2(1, 0, 0, TOOL_LISTING_COLLAPSED_HEIGHT)}
				BackgroundTransparency={1}
				OnEvent:Activated={() => collapsed.set(!peek(collapsed))}
				Name="Overview"
			>
				<uilistlayout
					scope={scope}
					FillDirection={Enum.FillDirection.Horizontal}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					Padding={new UDim(0, 8)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<frame
					scope={scope}
					BackgroundColor3={theme(scope, "bgLightest")}
					BackgroundTransparency={scope.computedSpring((use) => (use(hover) ? 0 : 1))}
					Size={UDim2.fromOffset(24, 24)}
				>
					<Round scope={scope} radius={new UDim(0, 3)} />
					<Icon
						scope={scope}
						icon={fontAwesome.caretUp}
						anchorPoint={new Vector2(0.5, 0.5)}
						position={UDim2.fromScale(0.5, 0.5)}
						size={UDim2.fromOffset(20, 20)}
						iconRotation={scope.computedSpring((use) => (use(collapsed) ? 180 : 0), undefined, 2 / 3)}
					/>
				</frame>
				<Padding scope={scope} padding={new UDim(0, 6)} />
				<HintContainer
					scope={scope}
					children={
						<imagelabel
							scope={scope}
							BackgroundTransparency={1}
							Image={assets.images.ethereal}
							Size={UDim2.fromOffset(16, 16)}
						/>
					}
					text="This tool comes included with Ethereal!"
				/>
				<Paragraph
					scope={scope}
					text={scope.Computed((use) => use(tool).name)}
					padding={new UDim()}
					layoutOrder={1}
				/>
				<Muted
					scope={scope}
					text={scope.Computed((use) => use(tool).overview)}
					textTransparency={collapsedSpring}
					padding={new UDim()}
					layoutOrder={2}
				/>
				<frame scope={scope} LayoutOrder={3} Name="Spacer">
					<uiflexitem scope={scope} FlexMode={Enum.UIFlexMode.Fill} />
				</frame>
				<frame
					scope={scope}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundTransparency={1}
					LayoutOrder={4}
					Name="Actions"
				>
					<uilistlayout
						scope={scope}
						FillDirection={Enum.FillDirection.Horizontal}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						Padding={new UDim(0, 4)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					{buttons}
				</frame>
			</imagebutton>
			<frame
				scope={scope}
				BackgroundTransparency={1}
				ClipsDescendants={true}
				Size={scope.computedSpring(
					(use) => new UDim2(1, 0, 0, use(collapsed) ? use(contentAbsoluteSize).Y : 0),
				)}
				Name="Details"
			>
				<frame
					scope={scope}
					AutomaticSize={Enum.AutomaticSize.Y}
					BackgroundTransparency={1}
					Size={UDim2.fromScale(1, 0)}
					Out:AbsoluteSize={contentAbsoluteSize}
				>
					<uilistlayout
						scope={scope}
						FillDirection={Enum.FillDirection.Vertical}
						Padding={new UDim(0, 4)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					<Padding
						scope={scope}
						paddingX={new UDim(0, 8)}
						paddingTop={new UDim(0, 2)}
						paddingBottom={new UDim(0, 6)}
					/>
					<Show
						scope={scope}
						when={scope.Computed((use) => use(tool)._arguments !== undefined)}
						children={(scope) => (
							<ForValues
								scope={scope}
								each={scope.Computed((use) => use(tool)._arguments!)}
								children={(_, scope, v) => {
									let control: Maybe<Child>;

									switch (v.kind) {
										case "boolean":
											control = (
												<Toggle
													scope={scope}
													toggled={v.value as UsedAs<boolean>}
													onToggle={() => v.value.set(!peek(v.value))}
												/>
											);
									}

									return (
										<frame
											scope={scope}
											AutomaticSize={Enum.AutomaticSize.XY}
											BackgroundTransparency={1}
										>
											<uilistlayout
												scope={scope}
												FillDirection={Enum.FillDirection.Horizontal}
												VerticalAlignment={Enum.VerticalAlignment.Center}
												Padding={new UDim(0, 6)}
												SortOrder={Enum.SortOrder.LayoutOrder}
											/>
											<Paragraph scope={scope} text={v.label} padding={new UDim()} />
											{control}
										</frame>
									);
								}}
							/>
						)}
					/>
					<Muted scope={scope} text={scope.Computed((use) => use(tool).description)} padding={new UDim()} />
					{/* {scope.Computed((use) => (use(thisActions).size() > 1 ? buttons : []))} */}
				</frame>
			</frame>
		</frame>
	);
}
