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

// Transition code based on roblaudio/ocmusic-browser
// https://github.com/roblaudio/ocmusic-browser/blob/main/src/client/ui/app/app.tsx
// https://github.com/roblaudio/ocmusic-browser/blob/main/src/client/ui/components/router/RouteTransitioner.tsx

import Fusion, { peek } from "@rbxts/fusion";
import { isTower, selectedTower, setDefaultTower } from "lib/tower";
import { Scoped } from "scoped";
import { unwrapRouteContext } from "ui/routes";
import { theme } from "ui/theme";
import { createLayoutOrder } from "utils/ui";
import { Nav } from "./nav";
import { TowerSelector } from "./towerSelector";

// HACK: no selection service?
// import { Selection } from "@rbxts/services";
const Selection = game.GetService("Selection");

export interface AppProps extends Scoped {}

export function App({ scope }: AppProps) {
	const order = createLayoutOrder();
	const searchValue = scope.Value("");

	// tower selection
	const isSelecting = scope.Value(false);
	function trySelectTower(inst: Instance) {
		const [is, reason] = isTower(inst);
		if (!is) {
			print("Failed to select tower:", reason);
			return;
		}
		setDefaultTower(inst);
		selectedTower.set(inst);
	}

	// // TODO: abstract this to a dedicated component cuz ill use this often
	// const displayedRoute = scope.delay(unwrapRouteContext(), ROUTE_TRANSITION_TIME_SECONDS);
	// let previousTransitionDirection: TransitionDirection = TransitionDirection.Right;
	// const transitionDirection = scope.Computed((use) => {
	// 	const currentIndex = NAV_ROUTES.indexOf(ROUTE_TO_KEY.get(use(unwrapRouteContext()))!);
	// 	const displayedIndex = NAV_ROUTES.indexOf(ROUTE_TO_KEY.get(use(displayedRoute))!);
	// 	const difference = displayedIndex - currentIndex;

	// 	if (displayedIndex === 0) return previousTransitionDirection;

	// 	return (previousTransitionDirection =
	// 		displayedIndex - currentIndex < 0 ? TransitionDirection.Right : TransitionDirection.Left);
	// });

	const displayedRoute = unwrapRouteContext();

	return (
		<frame scope={scope} Size={UDim2.fromScale(1, 1)} Name="Ethereal" BackgroundColor3={theme(scope, "bg")}>
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Vertical}
				SortOrder={Enum.SortOrder.LayoutOrder}
				Padding={new UDim(0, 4)}
			/>
			<Nav scope={scope} />
			<frame scope={scope} BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)} Name="RouteContainer">
				<uiflexitem scope={scope} FlexMode={Enum.UIFlexMode.Fill} />
				{scope.Computed((use, scope) => use(displayedRoute).render({ scope: scope }))}
			</frame>
			<TowerSelector
				scope={scope}
				isSelecting={isSelecting}
				onClick={() => {
					if (peek(selectedTower)) {
						Selection.Set([peek(selectedTower)!]);
					}

					if (peek(isSelecting)) {
						isSelecting.set(false);
						const selection = Selection.Get();
						if (selection.size() > 0) trySelectTower(selection[0]!);
						return;
					}

					const selection = Selection.Get();
					if (selection.size() > 0) {
						trySelectTower(selection[0]!);
						return;
					}

					isSelecting.set(true);
				}}
				onDeselected={() => selectedTower.set(undefined)}
			/>
		</frame>
	);
}
