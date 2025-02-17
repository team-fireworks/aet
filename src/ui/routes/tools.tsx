// From Ethereal, licensed under the GNU General Public License v3.0

import Fusion, { Child, peek, UsedAs } from "@rbxts/fusion";
import assets from "assets";
import { Action, LibTool, onToolActionsChanged, onToolChanged, toolActions, toolArgs, tools } from "lib";
import { Button, ButtonStyle } from "ui/components/foundational/button";
import { HintContainer } from "ui/components/foundational/hint";
import { Muted } from "ui/components/foundational/muted";
import { Padding } from "ui/components/foundational/padding";
import { Paragraph } from "ui/components/foundational/paragraph";
import { Round } from "ui/components/foundational/round";
import { Scroller } from "ui/components/foundational/scroller";
import { Toggle } from "ui/components/foundational/toggle";
import { ForValues, Show } from "ui/components/fusion";
import { fontAwesome, Icon } from "ui/components/icons";
import { scope, Scoped } from "ui/scoped";
import { theme } from "ui/theme";

const TOOL_LISTING_COLLAPSED_HEIGHT = 32;

const toolActionsState = scope.Value(toolActions);
scope.push(onToolActionsChanged(() => toolActionsState.set(toolActions)));

export interface ToolListingProps extends Scoped {
	tool: UsedAs<LibTool>;
}

export function ToolListing({ scope, tool }: ToolListingProps) {
	const collapsed = scope.Value(false);
	const collapsedSpring = scope.computedSpring((use) => (use(collapsed) ? 1 : 0));
	const hover = scope.Value(false);
	const contentAbsoluteSize = scope.Value(Vector2.zero);

	const thisActions = scope.Computed((use) => use(toolActionsState).get(use(tool)) ?? new Array<Action>());

	const buttons = (
		<ForValues
			scope={scope}
			each={thisActions}
			children={(_, scope, { index, name, callbacks }) => (
				<Button
					scope={scope}
					style={ButtonStyle.Primary}
					label={name}
					layoutOrder={index}
					onClick={() => {
						for (const v of callbacks) task.spawn(v);
					}}
				/>
			)}
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
					text={scope.Computed((use) => use(tool).label)}
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
				<frame scope={scope} LayoutOrder={3}>
					<uiflexitem scope={scope} FlexMode={Enum.UIFlexMode.Fill} />
				</frame>
				<frame scope={scope} AutomaticSize={Enum.AutomaticSize.XY} BackgroundTransparency={1} LayoutOrder={4}>
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
						when={scope.Computed((use) => use(tool).args !== undefined)}
						children={(scope) => (
							<ForValues
								scope={scope}
								each={scope.Computed((use) => use(tool).args!)}
								children={(_, scope, v) => {
									let control: Maybe<Child>;
									switch (v.kind) {
										case "boolean":
											control = (
												<Toggle
													scope={scope}
													toggled={scope.Computed((use) => {
														// debug(`TOOL ARGS: ${use(toolArgs)}`);
														return use(toolArgs).get(use(tool))!.get(v.name)! as boolean;
													})}
													onToggle={() => {
														const args = peek(toolArgs).get(peek(tool))!;
														args.set(v.name, !args.get(v.name));
														toolArgs.set(peek(toolArgs));
													}}
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

export function Tools({ scope }: Scoped) {
	const toolValue = scope.Value(tools);
	onToolChanged(() => toolValue.set(tools));

	return (
		<Scroller scope={scope} automaticSize={Enum.AutomaticSize.Y} size={UDim2.fromScale(1, 1)}>
			<uilistlayout scope={scope} FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 4)} />
			<Padding scope={scope} padding={new UDim(0, 6)} paddingRight={new UDim(0, 24)} />
			<ForValues
				scope={scope}
				each={scope.Computed((use) => use(toolValue).sort((lhs, rhs) => lhs.name < rhs.name))}
				children={(_, scope, v) => <ToolListing scope={scope} tool={v} />}
			/>
		</Scroller>
	);
}
