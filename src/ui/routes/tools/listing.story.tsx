// // Eternal is a full-featured companion plugin for Eternal Towers of Hell
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

// import Fusion, { peek } from "@rbxts/fusion";
// import { LibRunContext, LibTool, ROOT_TOOL_SOURCE, toolArgs, toolChanged, tools } from "lib";
// import { debug, RobloxLogger, setDefaultLogger } from "log";
// import { fusionStory } from "uilabs";
// import { ToolListing } from "./listing";

// export = fusionStory({
// 	controls: {
// 		name: "exampleTool",
// 		label: "Example Tool",
// 		overview: "EToH Deletion 2025",
// 		description: "EToH Deletion 2025",
// 	},
// 	story: ({ controls, scope }) => {
// 		setDefaultLogger(new RobloxLogger({}));

// 		// TODO: there has to be a better way right?
// 		const mockTool = scope.Computed((use, scope): LibTool => {
// 			const t: LibTool = {
// 				name: use(controls.name),
// 				label: use(controls.label),
// 				overview: use(controls.overview),
// 				description: use(controls.description),

// 				source: ROOT_TOOL_SOURCE,
// 				args: [],

// 				run: (ctx: LibRunContext) => {
// 					debug(`Tool ran`);
// 				},
// 			};

// 			tools.push(t);

// 			const args = new Map<string, unknown>();
// 			for (const a of t.args) {
// 				args.set(a.name, { kind: a.kind, value: a.default });
// 			}

// 			// NOTE: this is okay because Fusion always recompute tables
// 			peek(toolArgs).set(t, args as never);
// 			toolArgs.set(peek(toolArgs));

// 			toolChanged(t);

// 			scope.push(() => {
// 				peek(tools).remove(peek(tools).indexOf(t));
// 				peek(toolArgs).delete(t);
// 			});

// 			return t;
// 		});

// 		return (
// 			<frame
// 				scope={scope}
// 				AutomaticSize={Enum.AutomaticSize.Y}
// 				BackgroundTransparency={1}
// 				Name="Fullwidth"
// 				Size={UDim2.fromScale(1, 0)}
// 			>
// 				<uilistlayout scope={scope} HorizontalFlex={Enum.UIFlexAlignment.Fill} />
// 				<ToolListing scope={scope} tool={mockTool} />
// 			</frame>
// 		);
// 	},
// });
