// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import assets from "assets";
import { newCoreExtension } from "lib/extensions";

const ext = newCoreExtension({ name: "Aet", icon: assets.images.dosuno });

ext.newCommand({
	name: "Changelog",
	description: "All release notes in one place.",
	run: (ctx) => {},
});

ext.newCommand({
	name: "Check For Updates",
	description: "Check if there's a new update available.",
	run: (ctx) => {},
});

ext.newCommand({
	name: "Show Onboarding",
	description: "Show onboarding flow.",
	run: (ctx) => {},
});

ext.newCommand({
	name: "Confetti",
	description: "Show confetti.",
	run: (ctx) => {},
});

ext.newCommand({
	name: "Aet Settings",
	description: "Show Aet settings.",
	run: (ctx) => {},
});

export = ext;
