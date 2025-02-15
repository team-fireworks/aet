import Fusion, { UsedAs } from "@rbxts/fusion";
import { Button, ButtonAlignX, ButtonStyle } from "ui/components/foundational/button";
import { Muted } from "ui/components/foundational/muted";
import { Fragment, Show } from "ui/components/fusion";
import { Scoped } from "ui/scoped";

export interface TowerSelectorProps extends Scoped {
	instance: UsedAs<Maybe<Instance>>;
	isSelecting: UsedAs<boolean>;
	onClick: () => void;
	onDeselected: () => void;
}

export function TowerSelector({ scope, instance, isSelecting, onClick, onDeselected }: TowerSelectorProps) {
	return (
		<frame
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			Size={UDim2.fromScale(1, 0)}
		>
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 4)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<Muted scope={scope} text="Selected tower:" />
			<Show
				scope={scope}
				when={scope.Computed((use) => use(instance) === undefined)}
				children={(scope) => [
					<Button
						scope={scope}
						style={ButtonStyle.Muted}
						// style={ButtonStyle.Secondary}
						flexMode={Enum.UIFlexMode.Fill}
						alignX={ButtonAlignX.Center}
						label="None, click to select tower"
						onClick={onClick}
					/>,
				]}
				fallback={(scope) => [
					<frame scope={scope} AutomaticSize={Enum.AutomaticSize.XY} BackgroundTransparency={1}>
						<uilistlayout
							scope={scope}
							FillDirection={Enum.FillDirection.Horizontal}
							VerticalAlignment={Enum.VerticalAlignment.Center}
							Padding={new UDim(0, 4)}
							SortOrder={Enum.SortOrder.LayoutOrder}
						/>
						<uiflexitem scope={scope} FlexMode={Enum.UIFlexMode.Fill} />
						<Button
							scope={scope}
							style={ButtonStyle.Secondary}
							flexMode={Enum.UIFlexMode.Fill}
							alignX={ButtonAlignX.Center}
							label={scope.Computed((use) => use(instance)?.Name ?? "Click to select tower")}
							onClick={onClick}
						/>
						<Button scope={scope} style={ButtonStyle.Muted} label="Deselect" onClick={onDeselected} />
					</frame>,
				]}
			/>
		</frame>
	);
}
