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
