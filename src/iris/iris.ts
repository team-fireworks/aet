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

import Iris from "@rbxts/iris";
import { SameLineArguments } from "@rbxts/iris/src/lib/widgets/format";
import { MenuArguments } from "@rbxts/iris/src/lib/widgets/menu";
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
	fn();
	// if (header.collapsed()) fn();
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

export function menuBar(fn: () => void) {
	Iris.MenuBar();
	fn();
	Iris.End();
}

export function menu(args: MenuArguments, fn: () => void) {
	Iris.Menu(args);
	fn();
	Iris.End();
}

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
	// if (tree.uncollapsed()) fn();
	fn();
	Iris.End();
}
