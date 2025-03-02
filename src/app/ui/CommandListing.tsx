// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Command } from "@rbxts/et-for-plugins";
import Fusion, { UsedAs } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { Box } from "ui/components/Box";
import { CornerSmall } from "ui/components/Corner";
import { Padding } from "ui/components/Padding";
import { Text, TextStyle } from "ui/components/Text";
import { pallete } from "ui/pallete";
import { udimPx } from "ui/udim";
import { indexUsedAsTable } from "utils/indexUsedAsTable";

export interface CommandListingProps extends ScopeProps {
	command: UsedAs<Command>;
	highlighted: UsedAs<boolean>;
	layoutOrder: UsedAs<number>;
	onMouseActivated: () => void;
}

export function CommandListing({ scope, command, highlighted, layoutOrder, onMouseActivated }: CommandListingProps) {
	const hover = scope.Value(false);

	return (
		<Box
			scope={scope}
			size={new UDim2(1, 0, 0, 32)}
			bg={scope.Computed((use, scope) => use(pallete(scope, use(hover) || use(highlighted) ? "bg" : "bgDark")))}
			onActivated={onMouseActivated}
			onHoverStart={() => hover.set(true)}
			onHoverEnd={() => hover.set(false)}
			layoutOrder={layoutOrder}
		>
			<uilistlayout
				scope={scope}
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<CornerSmall scope={scope} />
			<Padding scope={scope} paddingX={udimPx(6)} />
			<Text scope={scope} text={indexUsedAsTable(scope, command, "name")} textStyle={TextStyle.Text} />
		</Box>
	);
}
