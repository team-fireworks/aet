// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import Et from "@rbxts/et";
import ty from "@rbxts/libopen-ty";

export const NewExtensiondProps = ty
	.Struct(
		{ exhaustive: true },
		{
			plugin: ty.Predicate((x): x is Plugin => typeIs(x, "Instance") && classIs(x, "Plugin")).Nicknamed("Plugin"),
			name: ty.String,
			icon: ty.String,
			needs: ty.Array(ty.String),
		},
	)
	.Nicknamed("NewExtensionProps")
	.Retype<Et.NewExtensiondProps>();

export const BaseCommandArgument = ty
	.Struct(
		{ exhaustive: false },
		{
			kind: ty.String,
			purpose: ty.String,
			initial: ty.Unknown,
		},
	)
	.Nicknamed("BaseCommandArgument")
	.Retype<Et.BaseCommandArgument>();

function createCommandArgument<T extends Et.BaseCommandArgument>(
	kind: string,
	initialTypeof: keyof CheckableTypes,
	nicknamed: string,
) {
	return BaseCommandArgument.And(
		ty.Struct(
			{ exhaustive: true },
			{
				kind: ty.Just(kind),
				initial: ty.Typeof(initialTypeof),
			},
		),
	)
		.Nicknamed(nicknamed)
		.Retype<T>();
}

export const Color3CommandArgument = createCommandArgument("color3", "Color3", "Color3CommandArgument");

export const CommandArgument = Color3CommandArgument.Nicknamed("CommandArgument");

export const NewCommandProps = ty
	.Struct(
		{ exhaustive: true },
		{
			name: ty.String,
			description: ty.String,
			arguments: ty.Array(CommandArgument).Optional(),
			run: ty.Function,
		},
	)
	.Nicknamed("NewCommandProps")
	.Retype<Et.NewCommandProps>();
