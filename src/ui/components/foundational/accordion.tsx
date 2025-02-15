import Fusion, { Children, UsedAs } from "@rbxts/fusion";
import { Scoped } from "ui/scoped";
import { BaseProps, ChildrenProps, LayoutProps } from "ui/types";

export interface AccordianProps extends Scoped, BaseProps, LayoutProps, ChildrenProps {
	accordianLabel?: UsedAs<string>;
}

export function Accordian({ scope, [Children]: children }: AccordianProps) {
	const collapsed = scope.Value(false);

	return (
		<frame scope={scope}>
			<imagebutton scope={scope}></imagebutton>
			<frame scope={scope} Visible={scope.Computed((use) => !use(collapsed))}>
				{children}
			</frame>
		</frame>
	);
}
