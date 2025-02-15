import Fusion, { peek } from "@rbxts/fusion";
import { Workspace } from "@rbxts/services";
import { unwrapRouteContext } from "ui/routes";
import { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import { createLayoutOrder } from "utils/ui";
import { Nav } from "./nav";
import { TowerSelector } from "./tower-selector";

// HACK: no selection service?
// import { Selection } from "@rbxts/services";
const Selection = game.GetService("Selection");

const services = new Set(game.GetChildren());
export function isTower(inst: Instance): LuaTuple<[isTower: boolean, reason: Maybe<string>]> {
	if (inst === Workspace) return $tuple(false, "Towers should not be unparented in the Workspace.");
	if (services.has(inst as never)) return $tuple(false, "Services are not a tower.");

	if (!inst.FindFirstChild("ClientSidedObjects"))
		return $tuple(
			false,
			"No ClientSidedObjects folder. If you're building a purist tower, create an empty folder.",
		);

	if (!inst.FindFirstChild("Obby")) return $tuple(false, "No Obby folder.");
	if (!inst.FindFirstChild("Frame"))
		return $tuple(false, "No Frame folder. If you're building a frameless tower, create an empty group.");

	const spawn = inst.FindFirstChild("SpawnLocation");
	if (!spawn) return $tuple(false, "No SpawnLocation found. Create a new part to mark the start of the tower.");
	if (!spawn.IsA("BasePart"))
		return $tuple(false, `Expected SpawnLocation to be a base part, got a ${spawn.ClassName}`);

	return $tuple(true, undefined);
}

export interface AppProps extends Scoped {}

export function App({ scope }: AppProps) {
	const order = createLayoutOrder();
	const searchValue = scope.Value("");

	const selectedTowerInstance = scope.Value<Maybe<Instance>>(undefined);
	const isSelecting = scope.Value(false);

	function trySelectTower(inst: Instance) {
		const [is, reason] = isTower(inst);
		if (!is) {
			print("Failed to select tower:", reason);
			return;
		}
		selectedTowerInstance.set(inst);
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
				instance={selectedTowerInstance}
				isSelecting={isSelecting}
				onClick={() => {
					if (peek(selectedTowerInstance)) {
						Selection.Set([peek(selectedTowerInstance)!]);
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
				onDeselected={() => selectedTowerInstance.set(undefined)}
			/>
		</frame>
	);
}
