// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { Children, OnChange, UsedAs, Value } from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { Box } from "ui/components/foundation/Box";
import { CornerMid } from "ui/components/foundation/Corner";
import { Padding } from "ui/components/foundation/Padding";
import { TEXT_STYLE_FONTS, TEXT_STYLE_PALLETE, TEXT_STYLE_SIZES, TextStyle } from "ui/components/foundation/Text";
import { TransparentBox } from "ui/components/foundation/TransparentBox";
import { palette } from "ui/palette";
import { FULL_UDIM_2, udim2Scale, udimPx } from "ui/udim";

export interface CommandPaletteSearchProps extends ScopeProps {
	layoutOrder: UsedAs<number>;
	searchInput: UsedAs<string>;
	onSearchInputChanged: (text: string) => void;
	refSearchInput: Value<Maybe<TextBox>>;
}

export function CommandPaletteSearch({
	scope,
	searchInput,
	layoutOrder,
	onSearchInputChanged,
	refSearchInput,
}: CommandPaletteSearchProps) {
	let childrenLayoutOrder = 1;

	return (
		<Box
			scope={scope}
			name="CommandPaletteSearch"
			bg={palette(scope, "bgDark")}
			size={new UDim2(1, 0, 0, 42)}
			layoutOrder={layoutOrder}
		>
			<CornerMid scope={scope} />
			<frame
				scope={scope}
				Name="Cover"
				BackgroundColor3={palette(scope, "bgDark")}
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
				{refSearchInput.set(
					scope.Hydrate(new Instance("TextBox"))({
						BackgroundTransparency: 1,
						ClearTextOnFocus: false,
						FontFace: TEXT_STYLE_FONTS[TextStyle.Text],
						TextSize: TEXT_STYLE_SIZES[TextStyle.Text],
						Size: udim2Scale(0, 1),
						PlaceholderText: "Search for commands...",
						PlaceholderColor3: palette(scope, TEXT_STYLE_PALLETE[TextStyle.Text]),
						TextColor3: palette(scope, "fg"),
						TextXAlignment: Enum.TextXAlignment.Left,
						TextYAlignment: Enum.TextYAlignment.Center,
						Text: searchInput,
						LayoutOrder: childrenLayoutOrder++,
						[OnChange("Text")]: onSearchInputChanged,
						[Children]: <uiflexitem scope={scope} FlexMode={Enum.UIFlexMode.Fill} />,
					}),
				)}
			</TransparentBox>
		</Box>
	);
}
