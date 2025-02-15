import Fusion, { peek, UsedAs } from "@rbxts/fusion";
import { nameSortedTools, Tool } from "lib";
import { Muted } from "ui/components/foundational/muted";
import { Padding } from "ui/components/foundational/padding";
import { Paragraph } from "ui/components/foundational/paragraph";
import { Round } from "ui/components/foundational/round";
import { ForValues, Show } from "ui/components/fusion";
import { fontAwesome, Icon } from "ui/components/icons";
import { Scoped } from "ui/scoped";
import { theme } from "ui/theme";

const TOOL_LISTING_COLLAPSED_HEIGHT = 32;

export interface ToolListingProps extends Scoped {
	tool: UsedAs<Tool>;
}

export function ToolListing({ scope, tool }: ToolListingProps) {
	const collapsed = scope.Value(false);
	const hover = scope.Value(false);

	return (
		<frame
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={theme(scope, "bgLight")}
			ClipsDescendants={false}
			Size={UDim2.fromScale(1, 0)}
			OnEvent:MouseEnter={() => hover.set(true)}
			OnEvent:MouseLeave={() => hover.set(false)}
		>
			<Round scope={scope} radius={new UDim(0, 6)} />
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Vertical}
				Padding={new UDim(0, 1)}
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
					Padding={new UDim(0, 4)}
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
						iconRotation={scope.computedSpring((use) => (use(collapsed) ? 180 : 0), undefined, 0.6)}
					/>
				</frame>
				<Padding scope={scope} padding={new UDim(0, 6)} />
				<Paragraph scope={scope} text={scope.Computed((use) => use(tool).name)} padding={new UDim()} />
			</imagebutton>
			<Show
				scope={scope}
				when={collapsed}
				children={(scope) => (
					<frame
						scope={scope}
						AutomaticSize={Enum.AutomaticSize.Y}
						BackgroundTransparency={1}
						Size={UDim2.fromScale(1, 0)}
					>
						<Padding
							scope={scope}
							paddingX={new UDim(0, 8)}
							paddingTop={new UDim(0, 2)}
							paddingBottom={new UDim(0, 6)}
						/>
						<Muted
							scope={scope}
							text={scope.Computed((use) => use(tool).description)}
							padding={new UDim()}
						/>
					</frame>
				)}
			/>
		</frame>
	);
}

export function Tools({ scope }: Scoped) {
	return (
		<scrollingframe
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			Size={UDim2.fromScale(1, 0)}
		>
			<uilistlayout scope={scope} FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 4)} />
			<Padding scope={scope} padding={new UDim(0, 6)} />
			<ForValues
				scope={scope}
				each={nameSortedTools}
				children={(_, scope, v) => <ToolListing scope={scope} tool={v} />}
			/>
		</scrollingframe>
	);
}
