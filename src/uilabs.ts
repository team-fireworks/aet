// Eternal is a full-featured companion plugin for Eternal Towers of Hell
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

import { Child, Children, UsedAs, Value } from "@rbxts/fusion";
import { Environment, InferGenericProps } from "@rbxts/ui-labs";
import { scope, Scope } from "ui/scoped";

export type ControlType = string | number | boolean | Color3;
// | ReturnType<typeof Slider>
// | ReturnType<typeof RGBA>
// | ReturnType<typeof Choose>
// | ReturnType<typeof EnumList>;

export type Controls = Record<string, ControlType>;

export interface FusionStoryProps<C extends Controls> {
	scope: Scope;
	controls: { [K in keyof C]: UsedAs<C[K]> };
}

export interface FusionStoryConstructorProps<C extends Controls> {
	controls?: C;
	center?: boolean;
	story: (props: FusionStoryProps<C>) => Child;
}

export function fusionStory<C extends Controls>({
	controls,
	center = true,
	story,
}: FusionStoryConstructorProps<C>): unknown {
	// Don't create stories if this is required inside a plugin. Otherwise,
	// when this plugin reloads, UI Labs crashes.
	if (script.FindFirstAncestorWhichIsA("Plugin")) return undefined;
	return {
		controls: controls,
		render: ({ target, subscribe }: InferGenericProps<never>) => {
			const storyScope = scope.deriveScope();

			const storyControls: Record<string, Value<ControlType>> = {};
			if (controls) {
				for (const [k, v] of pairs(controls as Controls)) {
					storyControls[k] = scope.Value(v);
				}

				subscribe(((values: Record<string, unknown>) => {
					for (const [k, v] of pairs(values)) {
						storyControls[k]!.set(v as never);
					}
				}) as never);
			}

			const storyChild = story({ controls: storyControls as never, scope: storyScope });
			const holder = scope.New("Folder")({
				Name: "Holder",
				[Children]: center
					? scope.New("Frame")({
							AnchorPoint: new Vector2(0.5, 0.5),
							AutomaticSize: Enum.AutomaticSize.XY,
							BackgroundTransparency: 1,
							Position: UDim2.fromScale(0.5, 0.5),

							Name: "Center",

							[Children]: storyChild,
						})
					: storyChild,
			});

			Environment.SetStoryHolder(holder);

			scope.Hydrate(target)({
				[Children]: holder,
			});

			return () => {
				storyScope.doCleanup();
			};
		},
	};
}
