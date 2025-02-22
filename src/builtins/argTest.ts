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

import Object from "@rbxts/object-utils";
import { IS_DEV } from "constants";
import { ETHEREAL_SOURCE, newTool } from "lib";
import { debug } from "log";

if (IS_DEV) {
	newTool(ETHEREAL_SOURCE, {
		id: "argTest",
		name: "Argument Testing",
		overview: "EToH Deletion 2025",
		description: "EToH Deletion 2025",

		init: (lib) => {
			const args = Object.entries({
				booleanArg: lib.args.boolean({ label: "Boolean argument", default: false }),
				cframeArg: lib.args.cframe({ label: "Coordinate frame argument", default: new CFrame() }),
				colorArg: lib.args.color({ label: "Color argument", default: Color3.fromHex("b00b69") }),
				colorSequenceArg: lib.args.colorSequence({
					label: "Color sequence argument",
					default: new ColorSequence(new Color3(), new Color3(1, 1, 1)),
				}),
				numberArg: lib.args.number({ label: "Number argument", default: 1337 }),
				numberSequenceArg: lib.args.numberSeqeunce({
					label: "Number sequence argument",
					default: new NumberSequence(0, 1),
				}),
				stringArg: lib.args.string({ label: "String argument", default: "Hello Ethereal" }),
				vector2Arg: lib.args.vector2({ label: "2D vector argument", default: Vector2.zero }),
				vector3Arg: lib.args.vector3({ label: "3D vector argument", default: Vector3.zero }),
			}).sort(([lhs], [rhs]) => lhs < rhs);

			lib.action({ label: "Dump arguments" }).onClick(() => {
				for (const [key, arg] of args) debug(`${key}: ${arg.now()}`);
			});
		},
	});
}
