// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Et from "@rbxts/et";
import ty from "@rbxts/libopen-ty";

export const RegisterExtensionProps = ty
	.Struct(
		{ exhaustive: true },
		{
			plugin: ty.Predicate((x): x is Plugin => typeIs(x, "Instance") && classIs(x, "Plugin")),
			name: ty.String,
			description: ty.String,
			needs: ty.Array(ty.String),
		},
	)
	.Nicknamed("RegisterExtensionProps")
	.Retype<Et.RegisterExtensionProps>();

export const RegisterCommandProps = ty
	.Struct(
		{ exhaustive: true },
		{
			name: ty.String,
			description: ty.String,
		},
	)
	.Nicknamed("RegisterCommandProps")
	.Retype<Et.RegisterCommandProps>();
