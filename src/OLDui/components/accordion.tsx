// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children, UsedAs } from "@rbxts/fusion";
import { Scoped } from "scoped";
import type { BaseProps, ChildrenProps, LayoutProps } from "ui/types";

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
