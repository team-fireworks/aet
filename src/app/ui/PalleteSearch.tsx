// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children, OnChange, OnEvent, UsedAs } from "@rbxts/fusion";
import { Connect } from "libs/event";
import { ScopeProps } from "scope";
import { Box } from "ui/components/Box";
import { CornerMid } from "ui/components/Corner";
import { Padding } from "ui/components/Padding";
import { TEXT_STYLE_FONTS, TEXT_STYLE_PALLETE, TEXT_STYLE_SIZES, TextStyle } from "ui/components/Text";
import { TransparentBox } from "ui/components/TransparentBox";
import { pallete } from "ui/pallete";
import { FULL_UDIM_2, udim2Scale, udimPx } from "ui/udim";

export interface PalleteSearchProps extends ScopeProps {
	layoutOrder: UsedAs<number>;
	text: UsedAs<string>;
	onTextChanged: (text: string) => void;
	onDoFocus: Connect<[]>;
	onFocusLost: () => void;
}

export function PalleteSearch({ scope, text, layoutOrder, onTextChanged, onDoFocus, onFocusLost }: PalleteSearchProps) {
	// `Hydrate` already pushes to scope, so no need to push here
	const input = new Instance("TextBox");

	onDoFocus(() => input.CaptureFocus());

	return (
		<Box
			scope={scope}
			name="PalleteSearch"
			bg={pallete(scope, "bgDark")}
			size={new UDim2(1, 0, 0, 42)}
			layoutOrder={layoutOrder}
		>
			<CornerMid scope={scope} />
			<frame
				scope={scope}
				Name="Cover"
				BackgroundColor3={pallete(scope, "bgDark")}
				Size={udim2Scale(1, 0.5)}
				Position={udim2Scale(0, 1)}
				AnchorPoint={new Vector2(0, 1)}
			/>
			<TransparentBox scope={scope} name="Container" size={FULL_UDIM_2}>
				<uilistlayout
					scope={scope}
					FillDirection={Enum.FillDirection.Horizontal}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<Padding scope={scope} paddingX={udimPx(12)} />
				{scope.Hydrate(input)({
					BackgroundTransparency: 1,
					FontFace: TEXT_STYLE_FONTS[TextStyle.Text],
					TextSize: TEXT_STYLE_SIZES[TextStyle.Text],
					Size: udim2Scale(0, 1),
					PlaceholderText: "Search for commands...",
					PlaceholderColor3: pallete(scope, TEXT_STYLE_PALLETE[TextStyle.Text]),
					TextColor3: pallete(scope, "fg"),
					TextXAlignment: Enum.TextXAlignment.Left,
					TextYAlignment: Enum.TextYAlignment.Center,
					Text: text,
					[OnChange("Text")]: onTextChanged,
					[OnEvent("FocusLost")]: onFocusLost,
					[Children]: <uiflexitem scope={scope} FlexMode={Enum.UIFlexMode.Fill} />,
				})}
			</TransparentBox>
		</Box>
	);
}
