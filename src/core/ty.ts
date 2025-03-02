// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Ethereal from "@rbxts/et-for-plugins";
import Ty from "@rbxts/ty";

export const Command = Ty.Struct({
	name: Ty.String,
	description: Ty.String,
	run: Ty.Function,
})
	.Nicknamed("Command")
	.Retype<Ethereal.Command>();
