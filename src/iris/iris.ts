import Iris from "@rbxts/iris";
import { SameLineArguments } from "@rbxts/iris/src/lib/widgets/format";
import { TableArguments } from "@rbxts/iris/src/lib/widgets/table";
import { CollapsingHeaderArguments, TreeArguments } from "@rbxts/iris/src/lib/widgets/tree";
import { WindowArguments } from "@rbxts/iris/src/lib/widgets/window";

export function window(args: WindowArguments, fn: () => void) {
	const win = Iris.Window(args);
	fn();
	Iris.End();
	return win;
}

export function accordion(args: CollapsingHeaderArguments, fn: () => void) {
	const header = Iris.CollapsingHeader(args);
	if (header.collapsed()) fn();
	Iris.End();
}

export function createTable(args: TableArguments, fn: () => void) {
	Iris.Table(args);
	fn();
	Iris.End();
}

export function sameline(args: SameLineArguments, fn: () => void) {
	Iris.SameLine(args);
	fn();
	Iris.End();
}

// export function menuBar(fn: () => void) {
// 	Iris.MenuBar();
// 	fn();
// 	Iris.End();
// }

// export function menu(args: MenuArguments, fn: () => void) {
// 	Iris.Menu(args);
// 	fn();
// 	Iris.End();
// }

export function section(name: string, fn: () => void) {
	Iris.SeparatorText([name]);
	fn();
}

export function combo<T>(name: string, state: Iris.State<T>, options: [label: string, T][]) {
	Iris.Combo([name], { index: state });
	for (const v of options) Iris.Selectable(v, { index: state });
	Iris.End();
}

export function tree(args: TreeArguments, fn: () => void) {
	const tree = Iris.Tree(args);
	if (tree.collapsed()) fn();
	Iris.End();
}
