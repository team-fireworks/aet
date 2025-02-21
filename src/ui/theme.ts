// Eternal is a full-featured companion plugin for Eternal Towers of Hell.
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

import Fusion, { peek, Scope, UsedAs } from "@rbxts/fusion";
import { scope } from "scoped";

export interface Theme {
	name: string;

	border: Color3;
	bg: Color3;
	bgLight: Color3;
	bgLighter: Color3;
	bgLightest: Color3;
	bgDark: Color3;
	bgDarker: Color3;
	bgDarkest: Color3;
	fg: Color3;
	fgLight: Color3;
	fgLighter: Color3;
	fgLightest: Color3;
	fgDark: Color3;
	fgDarker: Color3;
	fgDarkest: Color3;

	primary: Color3;
	primaryLight: Color3;
	secondary: Color3;
	secondaryLight: Color3;
	tertiary: Color3;
	tertiaryLight: Color3;
	quaternary: Color3;
	quaternaryLight: Color3;

	buttonPrimaryBg: Color3;
	buttonPrimaryHover: Color3;
	buttonPrimaryFg: Color3;
	buttonDangerBg: Color3;
	buttonDangerHover: Color3;
	buttonDangerFg: Color3;
}

export type ThemeKey = keyof Theme;

export const ETHEREAL_GRAY_HUE = 200 / 360;
export const ETHEREAL_GRAY_SATURATION = 0.02;
export const ETHEREAL_RED_HUE = 0 / 360;
export const ETHEREAL_RED_SATURATION = 0.8;
export const ETHEREAL_GOLD_HUE = 40 / 360;
export const ETHEREAL_GOLD_SATURATION = 0.7;
export const ETHEREAL_GREEN_HUE = 100 / 360;
export const ETHEREAL_GREEN_SATURATION = 1;
export const ETHEREAL_BLUE_HUE = 200 / 360;
export const ETHEREAL_BLUE_SATURATION = 1;

export const THEMES = {
	dark: {
		name: "Dark",

		border: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.15 - 0.025),
		bg: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.15),
		bgLight: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.2),
		bgLighter: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.25),
		bgLightest: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.3),
		bgDark: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.1),
		bgDarker: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.05),
		bgDarkest: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.025),
		fg: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.8),
		fgLight: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.85),
		fgLighter: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.9),
		fgLightest: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.95),
		fgDark: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.65),
		fgDarker: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.6),
		fgDarkest: Color3.fromHSV(ETHEREAL_GRAY_HUE, ETHEREAL_GRAY_SATURATION, 0.55),

		primary: Color3.fromHSV(ETHEREAL_GOLD_HUE, ETHEREAL_GOLD_SATURATION, 0.8),
		primaryLight: Color3.fromHSV(ETHEREAL_GOLD_HUE, ETHEREAL_GOLD_SATURATION, 0.85),
		secondary: Color3.fromHSV(ETHEREAL_RED_HUE, ETHEREAL_RED_SATURATION, 0.8),
		secondaryLight: Color3.fromHSV(ETHEREAL_RED_HUE, ETHEREAL_RED_SATURATION, 0.85),
		tertiary: Color3.fromHSV(ETHEREAL_GREEN_HUE, ETHEREAL_GREEN_SATURATION, 0.8),
		tertiaryLight: Color3.fromHSV(ETHEREAL_GREEN_HUE, ETHEREAL_GREEN_SATURATION, 0.85),
		quaternary: Color3.fromHSV(ETHEREAL_BLUE_HUE, ETHEREAL_BLUE_SATURATION, 0.8),
		quaternaryLight: Color3.fromHSV(ETHEREAL_BLUE_HUE, ETHEREAL_BLUE_SATURATION, 0.85),

		// TODO: replace this in btn component with more accent themes
		buttonPrimaryBg: Color3.fromHSV(ETHEREAL_GOLD_HUE, ETHEREAL_GOLD_SATURATION, 0.9),
		buttonPrimaryHover: Color3.fromHSV(ETHEREAL_GOLD_HUE, ETHEREAL_GOLD_SATURATION, 1),
		buttonPrimaryFg: Color3.fromHSV(ETHEREAL_GOLD_HUE, ETHEREAL_GOLD_SATURATION, 0.2),
		buttonDangerBg: Color3.fromHSV(0 / 360, 0.75, 0.8),
		buttonDangerHover: Color3.fromHSV(0 / 360, 0.75, 0.9),
		buttonDangerFg: Color3.fromHSV(0 / 360, 0.75, 0.3),
	},
} satisfies Record<string, Theme>;

export enum StudioTheme {
	Dark,
	Light,
}

export const studioTheme = scope.Value(StudioTheme.Dark);

export const themeValue = scope.Value(THEMES.dark);
export const themeContext = scope.Contextual<UsedAs<Theme>>(peek(themeValue));

scope.push(
	settings().Studio.ThemeChanged.Connect(() => {
		// studioTheme.set(settings().Theme);
	}),
);

export const currentTheme = scope.Computed((use) => {
	return use(themeContext.now());
});

export function theme<K extends keyof Theme>(scope: Scope<typeof Fusion>, key: K) {
	return scope.Computed((use) => use(currentTheme)[key]);
}
