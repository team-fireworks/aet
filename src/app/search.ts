// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Command } from "@rbxts/et-for-plugins";
import { score } from "libs/fzy";

const MINIMUM_SCORE = 3;

export class Search {
	private searchCache = new Map<string, Command[]>();

	search(searchInput: string, commands: Command[]): Command[] {
		const searchInputLower = searchInput.lower();

		if (this.searchCache.has(searchInputLower)) {
			return this.searchCache.get(searchInputLower)!;
		}

		const filtered = this.filterAndSortCommands(searchInputLower, commands);
		this.searchCache.set(searchInputLower, filtered);

		return filtered;
	}

	private filterAndSortCommands(searchInput: string, commands: Command[]): Command[] {
		return commands
			.filter((cmd) => score(searchInput, cmd.name.lower()) > MINIMUM_SCORE)
			.sort((a, b) => score(a.name.lower(), searchInput) < score(b.name.lower(), searchInput));
	}

	clearCache() {
		this.searchCache.clear();
	}
}
