// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

// Can't register storybook inside a plugin or otherwise when it reloads UI Labs
// crashes
export = script.FindFirstAncestorWhichIsA("Plugin")
	? undefined
	: {
			name: "Ethereal",
			storyRoots: [script.Parent!.Parent],
		};
