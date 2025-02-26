// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { ETHEREAL_SOURCE, newTool } from "lib";

newTool(ETHEREAL_SOURCE, {
	id: "combineAttachments",
	name: "Combine Attachments",
	overview: "Combines Attachments to a single part. Useful for part optimizing.",
	description:
		"Combines ParticleEmitters and Beams in attachments to a single " +
		'part. Select the target "Holder" part, then select everything that ' +
		"should be merged. This was used in Tower of Complexity and " +
		"Volatility to save on parts that otherwise would be used to hold " +
		"beams and particle emitters.",

	init: (lib) => {
		const combineParticles = lib.args.boolean({ label: "Combine Particle Emitters?", default: true });
		const combineBeams = lib.args.boolean({ label: "Combine Beams?", default: true });
		const combineRopes = lib.args.boolean({ label: "Combine Rope Contraints?", default: true });

		lib.action({ label: "Select Target" }).onClick(() => {});

		lib.action({ label: "Combine Selection to Target" }).onClick(() => {});
	},
});
