import Fusion, { peek, Scope, UsedAs } from "@rbxts/fusion";
import { scope } from "./scoped";

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

	buttonPrimaryBg: Color3;
	buttonPrimaryHover: Color3;
	buttonPrimaryFg: Color3;
	buttonDangerBg: Color3;
	buttonDangerHover: Color3;
	buttonDangerFg: Color3;
}

export const THEMES = {
	dark: {
		name: "Dark",

		border: Color3.fromHex("242424"),
		bg: Color3.fromHex("#2A2A2A"),
		bgLight: Color3.fromHex("#2F2F2F"),
		bgLighter: Color3.fromHex("#3A3A3A"),
		bgLightest: Color3.fromHex("#3F3F3F"),
		bgDark: Color3.fromHex("242424"),
		bgDarker: Color3.fromHex("#1A1A1A"),
		bgDarkest: Color3.fromHex("#0F0F0F"),
		fg: Color3.fromHex("EEEEEE"),
		fgLight: Color3.fromHex("EEEEEE"),
		fgLighter: Color3.fromHex("EEEEEE"),
		fgLightest: Color3.fromHex("EEEEEE"),
		fgDark: Color3.fromHex("DDDDDD"),
		fgDarker: Color3.fromHex("CCCCCC"),
		fgDarkest: Color3.fromHex("BBBBBB"),

		buttonPrimaryBg: Color3.fromHSV(40 / 360, 0.75, 0.9),
		buttonPrimaryHover: Color3.fromHSV(40 / 360, 0.75, 1),
		buttonPrimaryFg: Color3.fromHSV(40 / 360, 0.75, 0.1),
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
