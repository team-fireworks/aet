// Eternal is a full-featured companion plugin for Eternal Towers of Hell
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

import Fusion, { UsedAs } from "@rbxts/fusion";
import { selectedTower } from "lib/tower";
import { Scoped } from "scoped";
import { Button, ButtonAlignX, ButtonStyle } from "ui/components/foundational/button";
import { Muted } from "ui/components/foundational/muted";
import { Padding } from "ui/components/foundational/padding";
import { Show } from "ui/components/fusion";
import { theme } from "ui/theme";

export interface TowerSelectorProps extends Scoped {
	isSelecting: UsedAs<boolean>;
	onClick: () => void;
	onDeselected: () => void;
}

export function TowerSelector({ scope, isSelecting, onClick, onDeselected }: TowerSelectorProps) {
	return (
		<frame
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={theme(scope, "bg")}
			Name="TowerSelector"
			Size={UDim2.fromScale(1, 0)}
		>
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 4)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<Padding scope={scope} padding={new UDim(0, 6)} />
			<Muted scope={scope} text="Selected tower:" />
			<Show
				scope={scope}
				when={scope.Computed((use) => use(selectedTower) === undefined)}
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
							label={scope.Computed((use) => use(selectedTower)?.Name ?? "Click to select tower")}
							onClick={onClick}
						/>
						<Button scope={scope} style={ButtonStyle.Muted} label="Deselect" onClick={onDeselected} />
					</frame>,
				]}
			/>
		</frame>
	);
}
