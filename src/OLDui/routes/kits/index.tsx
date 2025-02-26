// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Fusion, { peek } from "@rbxts/fusion";
import { Selection } from "@rbxts/services";
import { KITS, Tag } from "kits";
import { selectedTower } from "lib/tower";
import { Scoped } from "scoped";
import { Button, ButtonStyle } from "ui/components/button";
import { List, Round } from "ui/components/constraints";
import { HintContainer } from "ui/components/hint";
import { Icon } from "ui/components/icons";
import { Muted } from "ui/components/muted";
import { Padding } from "ui/components/padding";
import { Pane, TransparentPane } from "ui/components/panes";
import { Paragraph } from "ui/components/paragraph";
import { HorizontalScroller, Scroller } from "ui/components/scroller";
import { Subtext } from "ui/components/subtext";
import { sans } from "ui/fonts";
import { theme } from "ui/theme";
import { FULL_UDIM_2, udim2Px, udim2Scale, udimPx, ZERO_UDIM } from "ui/udims";
import { UserId } from "userids";

const TOWER_KIT_TAG: Tag = {
	label: "Tower Kit",
	hint: "Fundamentals required to build a tower",
};

const KIT_ADDON_TAG: Tag = {
	label: "Kit Addon",
	hint: "Adds more features to standard tower kits",
};

export interface KitPreviewProps extends Scoped {
	name: string;
	label: string;
	overview: string;
	creators: UserId[];
	thumbnail: string;
	tags: Tag[];
	onInsert: () => void;
}

export function KitPreview({ scope, name, label, overview, creators, thumbnail, tags, onInsert }: KitPreviewProps) {
	return (
		<Pane scope={scope} size={udim2Px(320, 128)} padding={ZERO_UDIM}>
			<imagelabel
				scope={scope}
				BackgroundTransparency={1}
				Image={thumbnail}
				Size={udim2Px(128, 128)}
				ScaleType={Enum.ScaleType.Fit}
			>
				<Round scope={scope} radius={udimPx(4)} />
			</imagelabel>
			<TransparentPane
				scope={scope}
				position={udim2Px(128, 0)}
				size={new UDim2(1, -128, 0, 128)}
				paddingX={udimPx(8)}
				paddingY={udimPx(6)}
			>
				<List
					scope={scope}
					direction={Enum.FillDirection.Vertical}
					alignY={Enum.VerticalAlignment.Center}
					padding={udimPx(2)}
				/>
				<Paragraph scope={scope} text={name} rich padding={ZERO_UDIM} />
				<TransparentPane scope={scope} automaticSize={Enum.AutomaticSize.XY}>
					<List
						scope={scope}
						direction={Enum.FillDirection.Horizontal}
						alignY={Enum.VerticalAlignment.Center}
						padding={udimPx(2)}
					/>
					{tags.map((v) => (
						<HintContainer
							scope={scope}
							children={
								<frame
									scope={scope}
									AutomaticSize={Enum.AutomaticSize.XY}
									BackgroundColor3={theme(scope, "primary")}
									BackgroundTransparency={0.8}
								>
									<Padding scope={scope} paddingX={udimPx(4)} paddingY={udimPx(2)} />
									<Round scope={scope} radius={udimPx(4)} />
									<textlabel
										scope={scope}
										AutomaticSize={Enum.AutomaticSize.XY}
										BackgroundTransparency={1}
										FontFace={sans()}
										Text={v.label}
										TextColor3={theme(scope, "primary")}
										TextSize={12}
									/>
								</frame>
							}
							text={v.hint}
						/>
					))}
				</TransparentPane>
				<Muted
					scope={scope}
					text={`${overview}. Made by <b>${creators.map((v) => UserId[v]).join("</b>, <b>")}</b>.`}
					rich
					padding={ZERO_UDIM}
					paddingBottom={udimPx(6)}
				/>
				<Button scope={scope} style={ButtonStyle.Primary} label="Insert" onClick={onInsert} />
			</TransparentPane>
		</Pane>
	);
}

export function Kits({ scope }: Scoped) {
	return (
		<Scroller scope={scope} size={FULL_UDIM_2}>
			<List scope={scope} direction={Enum.FillDirection.Vertical} padding={udimPx(4)} />
			<Padding scope={scope} padding={udimPx(6)} paddingRight={udimPx(24)} />
			{KITS.map((v) => [
				<TransparentPane scope={scope} automaticSize={Enum.AutomaticSize.Y} size={udim2Scale(1, 0)}>
					<List
						scope={scope}
						direction={Enum.FillDirection.Horizontal}
						alignY={Enum.VerticalAlignment.Center}
					/>
					<Icon scope={scope} icon={v.icon} size={udim2Px(24, 24)} />
					<Subtext scope={scope} automaticSize={Enum.AutomaticSize.XY} text={v.name} />
				</TransparentPane>,
				<HorizontalScroller scope={scope} size={new UDim2(1, 0, 0, 128 + 32)} layoutOrder={2}>
					<List scope={scope} direction={Enum.FillDirection.Horizontal} padding={udimPx(4)} />
					{v.kits.map((v) => (
						<KitPreview
							scope={scope}
							name={v.name}
							label="Tower Kit"
							overview={v.overview}
							creators={v.creators}
							thumbnail={v.thumbnail}
							tags={[TOWER_KIT_TAG, ...v.tags]}
							onInsert={() => Selection.Set([v.insert()])}
						/>
					))}
					{v.addons.map((v) => (
						<KitPreview
							scope={scope}
							name={v.name}
							label="Addon"
							overview={v.overview}
							creators={v.creators}
							thumbnail={v.thumbnail}
							tags={[KIT_ADDON_TAG, ...v.tags]}
							onInsert={() => {
								if (peek(selectedTower)) Selection.Set([v.insert(peek(selectedTower)!)]);
							}}
						/>
					))}
				</HorizontalScroller>,
			])}
		</Scroller>
	);
}
