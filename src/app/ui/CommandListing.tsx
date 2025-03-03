// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { CoreCommand } from "core/types";
import { ScopeProps } from "scope";
import { Box } from "ui/components/Box";
import { CornerSmall } from "ui/components/Corner";
import { Padding } from "ui/components/Padding";
import { Text, TextStyle } from "ui/components/Text";
import { pallete } from "ui/pallete";
import { udimPx, udimSqPx } from "ui/udim";
import { indexUsedAsTable } from "utils/indexUsedAsTable";

export interface CommandListingProps extends ScopeProps {
	command: UsedAs<CoreCommand>;
	highlighted: UsedAs<boolean>;
	layoutOrder: UsedAs<number>;
	onMouseActivated: () => void;
}

export function CommandListing({ scope, command, highlighted, layoutOrder, onMouseActivated }: CommandListingProps) {
	const hover = scope.Value(false);
	let childrenlayoutOrder = 1;

	const commandPlugin = indexUsedAsTable(scope, command, "_plugin");

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
				SortOrder={Enum.SortOrder.LayoutOrder}
				Padding={udimPx(4)}
			/>
			<CornerSmall scope={scope} />
			<Padding scope={scope} paddingX={udimPx(6)} />
			<imagelabel
				scope={scope}
				BackgroundTransparency={1}
				Size={udimSqPx(18)}
				Image={indexUsedAsTable(scope, commandPlugin, "_icon")}
				LayoutOrder={childrenlayoutOrder++}
			/>
			<Text
				scope={scope}
				text={indexUsedAsTable(scope, command, "name")}
				textStyle={TextStyle.Text}
				layoutOrder={childrenlayoutOrder++}
			/>
			<Text
				scope={scope}
				text={indexUsedAsTable(scope, commandPlugin, "_name")}
				textStyle={TextStyle.Label}
				layoutOrder={childrenlayoutOrder++}
			/>
		</Box>
	);
}
