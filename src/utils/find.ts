export type ModuleTree = [root: Instance, parts: string[]];

export async function waitModuleTree(tree: ModuleTree) {
	const [root, parts] = tree;
	let inst = root;

	for (const v of parts) {
		inst = inst.WaitForChild(v);
	}

	return inst;
}
