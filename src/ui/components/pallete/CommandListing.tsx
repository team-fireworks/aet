// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { LibCommand } from "lib/types";
import { ScopeProps } from "scope";
import { Box } from "ui/components/foundation/Box";
import { CornerSmall } from "ui/components/foundation/Corner";
import { Padding } from "ui/components/foundation/Padding";
import { Text, TextStyle } from "ui/components/foundation/Text";
import { pallete } from "ui/pallete";
import { udimPx } from "ui/udim";

export interface CommandListingProps extends ScopeProps {
	command: UsedAs<LibCommand>;
	highlighted: UsedAs<boolean>;
	layoutOrder: UsedAs<number>;
	onMouseActivated: () => void;
}

export function CommandListing({ scope, command, highlighted, layoutOrder, onMouseActivated }: CommandListingProps) {
	const hover = scope.Value(false);
	let childrenlayoutOrder = 1;

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
			{/* <imagelabel
				scope={scope}
				BackgroundTransparency={1}
				Name="Icon"
				Size={udimSqPx(18)}
				Image={scope.Computed((use) => use(commandPlugin).icon)}
				LayoutOrder={childrenlayoutOrder++}
			/> */}
			<Text
				scope={scope}
				name="Name"
				text={scope.Computed((use) => use(command).name)}
				textStyle={TextStyle.Text}
				textWrapped={false}
				layoutOrder={childrenlayoutOrder++}
			/>
			{/* <Text
				scope={scope}
				name="PluginName"
				text={indexUsedAsTable(scope, commandPlugin, "_name")}
				textStyle={TextStyle.Label}
				textWrapped={false}
				layoutOrder={childrenlayoutOrder++}
			/> */}
		</Box>
	);
}
