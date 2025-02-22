// // Eternal is a full-featured companion plugin for Eternal Towers of Hell.
// // Copyright (C) 2025 znotfireman
// //
// // This program is free software: you can redistribute it and/or modify it unde
// // the terms of the GNU General Public License as published by the Free Software
// // Foundation, either version 3 of the License, or (at your option) any later
// // version.
// //
// // This program is distributed in the hope that it will be useful, but WITHOUT
// // ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// // FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// // details.
// //
// // You should have received a copy of the GNU General Public License along with
// // this program. If not, see <https://www.gnu.org/licenses/>.

// import { ETHEREAL_SOURCE, newTool } from "lib";

// newTool(ETHEREAL_SOURCE, {
// 	id: "combineAttachmentEffects",
// 	name: "Combine Attachment Effects",
// 	overview: "Combines ParticleEmitters and Beams in attachments to a single part. Useful for part optimizing.",
// 	description:
// 		"Combines ParticleEmitters and Beams in attachments to a single " +
// 		'part. Select the target "Holder" part, then select everything that ' +
// 		"should be merged. This was used in Tower of Complexity and " +
// 		"Volatility to save on parts that otherwise would be used to hold " +
// 		"beams and particle emitters.",

// 	init: (lib) => {
// 		const combineParticles = lib.args.boolean({ label: "Combine Particle Emitters?", default: true });
// 		const combineBeams = lib.args.boolean({ label: "Combine Beams?", default: true });

// 		lib.action({ label: "Select Target" }).onClick(() => {});

// 		lib.action({ label: "Combine Selection to Target" }).onClick(() => {});
// 	},
// });
