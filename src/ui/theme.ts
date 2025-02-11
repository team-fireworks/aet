import { peek, UsedAs } from "@rbxts/fusion";
import { scope } from "./scoped";

export interface Theme {
	name: string;

	bg: Color3;
	bgLight: Color3;
	bgLighter: Color3;
	bgLightest: Color3;
	fg: Color3;
	fgLight: Color3;
	fgLighter: Color3;
	fgLightest: Color3;
}

export const THEMES = {
	dark: {
		name: "Dark",

		bg: Color3.fromHex("#2A2A2A"),
		bgLight: Color3.fromHex("#3A3A3A"),
		bgLighter: Color3.fromHex("#4A4A4A"),
		bgLightest: Color3.fromHex("#5A5A5A"),
		fg: Color3.fromHex("EEEEEE"),
		fgLight: Color3.fromHex("EEEEEE"),
		fgLighter: Color3.fromHex("EEEEEE"),
		fgLightest: Color3.fromHex("EEEEEE"),
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

export const theme = scope.Computed((use) => {
	return use(themeContext.now());
});

export function useTheme<K extends keyof Theme>(key: K) {
	return scope.Computed((use) => use(theme)[key]);
}
