// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { UsedAs } from "@rbxts/fusion";
import { VERSION } from "config";
import { ScopeProps } from "scope";
import { Box } from "ui/components/Box";
import { CornerMid } from "ui/components/Corner";
import { Padding } from "ui/components/Padding";
import { Text, TextStyle } from "ui/components/Text";
import { TransparentBox } from "ui/components/TransparentBox";
import { pallete } from "ui/pallete";
import { udim2Scale, udimPx, udimSqScale } from "ui/udim";

export interface PalleteFooterProps extends ScopeProps {
	layoutOrder: UsedAs<number>;
}

export function PalleteFooter({ scope, layoutOrder }: PalleteFooterProps) {
	let childrenlayoutOrder = 1;
	return (
		<Box scope={scope} name="PalleteFooter" size={new UDim2(1, 0, 0, 32)} layoutOrder={layoutOrder}>
			<CornerMid scope={scope} />
			<frame scope={scope} Name="Cover" BackgroundColor3={pallete(scope, "bg")} Size={udim2Scale(1, 0.5)} />
			<TransparentBox scope={scope} size={udimSqScale(1)}>
				<uilistlayout
					scope={scope}
					FillDirection={Enum.FillDirection.Horizontal}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={udimPx(4)}
				/>
				<Padding scope={scope} paddingX={udimPx(12)} />
				{/* <imagelabel
					scope={scope}
					BackgroundTransparency={1}
					Name="Icon"
					Size={udimSqPx(18)}
					Image={assets.images.et}
					LayoutOrder={childrenlayoutOrder++}
				/> */}
				<Text
					scope={scope}
					text={VERSION.toString()}
					textStyle={TextStyle.Label}
					layoutOrder={childrenlayoutOrder++}
				/>
			</TransparentBox>
		</Box>
	);
}
