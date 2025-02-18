import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importsPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import robloxTs from "eslint-plugin-roblox-ts";

export default [
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"@typescript-eslint": tsPlugin,
			import: importsPlugin,
			prettier: prettierPlugin,
			"roblox-ts": robloxTs,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "tsconfig.build.json",
				sourceType: "module",
			},
		},
		rules: {
			"no-unused-vars": "off",
			"no-undef": "off",
			"no-shadow": "off",
			"import/no-unresolved": "off",
			"import/named": "warn",
			"prettier/prettier": "error",
		},
	},
];
