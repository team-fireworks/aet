import Fusion, { UsedAs } from "@rbxts/fusion";
import { Padding } from "ui/components/foundational/padding";
import { Paragraph } from "ui/components/foundational/paragraph";
import { ForValues } from "ui/components/fusion";
import { Icon } from "ui/components/icons";
import { NAV_ROUTES, ROUTES, unwrapRouteContext } from "ui/routes";
import { Scoped } from "ui/scoped";
import { theme } from "ui/theme";
import { createLayoutOrder } from "utils/ui";

export interface NavTabProps extends Scoped {
	icon: UsedAs<Icon>;
	label: UsedAs<string>;
	highlighted: UsedAs<boolean>;
	onClick: () => void;
}

export function NavTab({ scope, icon, label, highlighted, onClick }: NavTabProps) {
	const hover = scope.Value(false);

	return (
		<imagebutton
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.X}
			AutoButtonColor={false}
			BackgroundColor3={theme(scope, "bgLighter")}
			BackgroundTransparency={scope.computedSpring((use) => (use(highlighted) ? 0 : use(hover) ? 0.85 : 1))}
			Size={new UDim2(0, 0, 0, 32)}
			OnEvent:Activated={onClick}
			OnEvent:MouseEnter={() => hover.set(true)}
			OnEvent:MouseLeave={() => hover.set(false)}
		>
			<Padding scope={scope} paddingX={new UDim(0, 8)} paddingY={new UDim()} />
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>
			<Icon scope={scope} icon={icon} size={UDim2.fromOffset(18, 18)} />
			<Paragraph scope={scope} text={label} paddingLeft={new UDim(0, 4)} />
		</imagebutton>
	);
}

export interface NavProps extends Scoped {}

export function Nav({ scope }: NavProps) {
	const navOrder = createLayoutOrder();
	const heroOrder = createLayoutOrder();

	return (
		<frame
			scope={scope}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={theme(scope, "bgLight")}
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
					return (
						<NavTab
							scope={scope}
							icon={route.icon!}
							label={route.label}
							highlighted={scope.Computed((use) => use(unwrapRouteContext()) === route)}
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
