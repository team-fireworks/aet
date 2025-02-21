import type Ethereal from "@rbxts/ethereal-for-plugins";
import { t } from "@rbxts/t";
import { memoize } from "utils/memoize";

const optional = memoize(<T>(check: t.check<T>) => t.optional(check));

export const TowerKind = t.union(
	t.literal("etoh"),
	t.literal("mtkv5"),
	t.literal("mtkv4"),
	t.literal("tft"),
) as t.check<Ethereal.TowerKind>;

export const NewToolProps = t.strictInterface({
	id: t.string,
	name: t.string,
	overview: t.string,
	description: t.string,

	needsEdit: optional(t.boolean),
	needsRunning: optional(t.boolean),
	needsTower: optional(t.boolean),

	init: t.callback,
}) as t.check<Ethereal.NewToolProps>;

// export const Permissionprops = t.interface({
// 	id: t.string,
// 	name: t.string,
// 	icon: t.string,

// 	needsEdit: optional(t.boolean),
// 	needsRunning: optional(t.boolean),
// 	needsTower: optional(t.boolean),

// 	run: t.callback,
// }) as t.check<Ethereal.PermissionProps>;
