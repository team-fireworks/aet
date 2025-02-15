import { peek } from "@rbxts/fusion";
import { tools } from "lib/api";
import { info, trace } from "log";

export * from "lib/api";
export * from "lib/permissions";

const BUILTINS_FOLDER = script.WaitForChild("builtins");

const builtinModules = BUILTINS_FOLDER.GetDescendants().filter((v): v is ModuleScript => classIs(v, "ModuleScript"));
trace(`Requiring builtins: ${builtinModules.map((v) => v.Name).join(", ")}`);
for (const v of builtinModules) {
	require(v);
}

info(
	`Registered builtin tools: ${peek(tools)
		.map((v) => v.name)
		.join(", ")}`,
);
