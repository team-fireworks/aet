import { tools } from "./api";

print("Preloading builtin tools");
for (const v of script.Parent!.WaitForChild("builtins").GetDescendants()) {
	if (!classIs(v, "ModuleScript")) continue;
	require(v);
}

print("Loaded tools:", tools.map(({ name }) => name).join(", "));
