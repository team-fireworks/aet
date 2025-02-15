import Fusion, { peek } from "@rbxts/fusion";
import { isTower, selectedTower, setDefaultTower } from "lib/tower";
import { unwrapRouteContext } from "ui/routes";
import { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import { createLayoutOrder } from "utils/ui";
import { Nav } from "./nav";
import { TowerSelector } from "./tower-selector";

// HACK: no selection service?
// import { Selection } from "@rbxts/services";
const Selection = game.GetService("Selection");

export interface AppProps extends Scoped {}

export function App({ scope }: AppProps) {
	const order = createLayoutOrder();
	const searchValue = scope.Value("");

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

	return (
		<frame scope={scope} Size={UDim2.fromScale(1, 1)} Name="Ethereal" BackgroundColor3={theme(scope, "bg")}>
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Vertical}
				SortOrder={Enum.SortOrder.LayoutOrder}
				Padding={new UDim(0, 4)}
			/>
			<Nav scope={scope} />
			<frame scope={scope} BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
				<uiflexitem scope={scope} FlexMode={Enum.UIFlexMode.Fill} />
				{scope.Computed((use, scope) => {
					const route = use(unwrapRouteContext());
					return route.render({ scope: scope });
				})}
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
						if (selection.size() > 0) trySelectTower(selection[0]);
						return;
					}

					const selection = Selection.Get();
					if (selection.size() > 0) {
						trySelectTower(selection[0]);
						return;
					}

					isSelecting.set(true);
				}}
				onDeselected={() => selectedTower.set(undefined)}
			/>
		</frame>
	);
}
