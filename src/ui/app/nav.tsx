import Fusion, { UsedAs } from "@rbxts/fusion";
import { Scoped } from "scoped";
import { ForValues } from "ui/components/fusion";
import { Icon } from "ui/components/icons";
import { Padding } from "ui/components/padding";
import { Paragraph } from "ui/components/paragraph";
import { Round } from "ui/components/round";
import { NAV_ROUTES, Route, ROUTES, unwrapRouteContext } from "ui/routes";
import { theme } from "ui/theme";

const HIGHLIGHT_HEIGHT = 6;

export interface NavTabProps extends Scoped {
	route: UsedAs<Route>;
	order: UsedAs<number>;
	highlighted: UsedAs<boolean>;
	onClick: () => void;
}

export function NavTab({ scope, route, order, highlighted, onClick }: NavTabProps) {
	const hover = scope.Value(false);

	// FIXME: fusion needs this to be a state object?
	const sourceIconRotation = scope.computedSpring(() => 0);

	return (
		<imagebutton
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.X}
			AutoButtonColor={false}
			BackgroundColor3={theme(scope, "bgLighter")}
			BackgroundTransparency={scope.computedSpring((use) => (use(highlighted) ? 0 : use(hover) ? 0.85 : 1))}
			ClipsDescendants={true}
			LayoutOrder={order}
			Name={scope.Computed((use) => `NavTab(${use(route).label})`)}
			Size={new UDim2(0, 0, 0, 32)}
			OnEvent:Activated={() => {
				sourceIconRotation.addVelocity(120);
				onClick();
			}}
			OnEvent:MouseEnter={() => hover.set(true)}
			OnEvent:MouseLeave={() => hover.set(false)}
		>
			<Padding scope={scope} paddingX={new UDim(0, 8)} paddingY={new UDim()} />
			<Icon
				scope={scope}
				icon={scope.Computed((use) => use(route).icon!)}
				size={UDim2.fromOffset(18, 18)}
				anchorPoint={new Vector2(0, 0.5)}
				position={UDim2.fromScale(0, 0.5)}
				// iconRotation={sourceIconRotation}
			/>
			<Paragraph
				scope={scope}
				text={scope.Computed((use) => use(route).label!)}
				textWrapped={false}
				paddingLeft={new UDim(0, 4)}
				anchorPoint={new Vector2(0, 0.5)}
				position={new UDim2(0, 18, 0.5, 0)}
			/>
			<frame
				scope={scope}
				Size={new UDim2(1, 0, 0, HIGHLIGHT_HEIGHT)}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundColor3={theme(scope, "primary")}
				Position={scope.computedSpring(
					(use) => new UDim2(0.5, 0, 1, use(highlighted) ? -HIGHLIGHT_HEIGHT / 2 : 0),
				)}
			>
				<Round scope={scope} radius={new UDim(0, 2)} />
			</frame>
		</imagebutton>
	);
}

export interface NavProps extends Scoped {}

export function Nav({ scope }: NavProps) {
	return (
		<frame
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={theme(scope, "bgLight")}
			Name="Nav"
			Size={UDim2.fromScale(1, 0)}
		>
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<uistroke scope={scope} Color={theme(scope, "border")} />
			<ForValues
				scope={scope}
				each={NAV_ROUTES}
				children={(_, scope, v) => {
					const route = ROUTES[v];
					const index = NAV_ROUTES.indexOf(v);

					return (
						<NavTab
							scope={scope}
							route={route}
							highlighted={scope.Computed((use) => use(unwrapRouteContext()) === route)}
							order={index + 1}
							onClick={() => {
								unwrapRouteContext().set(route);
							}}
						/>
					);
				}}
			/>
		</frame>
	);
}
