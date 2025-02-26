// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

const REMOTE_PARENT = game.GetService("StudioService");
const REMOTE_NAME = "Ethereal(pluginAPI)";

function findRemote() {
	const existing = REMOTE_PARENT.FindFirstChild(REMOTE_NAME);
	if (existing) {
		if (existing.IsA("BindableFunction")) return existing;
		existing.Name = `OLD____${existing.Name}`;
	}

	const remote = new Instance("BindableFunction");
	remote.Name = REMOTE_NAME;
	remote.Parent = REMOTE_PARENT;

	return remote;
}

const remote = findRemote();
