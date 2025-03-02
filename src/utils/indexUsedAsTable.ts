// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Computed, UsedAs } from "@rbxts/fusion";
import { Scope } from "scope";

export function indexUsedAsTable<T, K extends keyof T>(scope: Scope, tab: UsedAs<T>, key: UsedAs<K>): Computed<T[K]> {
	return scope.Computed((use) => use(tab)[use(key)]);
}
