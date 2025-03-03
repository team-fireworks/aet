// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Et from "@rbxts/et-for-plugins";
import ty from "@rbxts/libopen-ty";
import Types from "./types";

export const Command = ty
	.Struct(
		{ exhaustive: true },
		{
			name: ty.String,
			description: ty.String,
			run: ty.Function,
		},
	)
	.Nicknamed("Command")
	.Retype<Et.Command>();

export const CoreCommandModule = ty
	.Struct(
		{ exhaustive: true },
		{
			name: ty.String,
			icon: ty.String.Optional(),
			run: ty.Function,
		},
	)
	.Nicknamed("CoreCommandModule")
	.Retype<Types.CoreCommandModule>();
