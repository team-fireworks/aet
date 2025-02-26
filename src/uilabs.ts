// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { Child, Children, doCleanup, UsedAs, Value } from "@rbxts/fusion";
import { InferGenericProps } from "@rbxts/ui-labs";
import { scope, Scope } from "scoped";

export interface UILabsControl {
	EntryType: "Control";
	Type: string;
	ControlValue: unknown;
}

export interface UILabsSliderControl extends UILabsControl {
	Type: "Slider";
	Min: number;
	Max: number;
	Step?: number;
}

export interface UILabsRGBAControl extends UILabsControl {
	Type: "RGBA";
	Color: Color3;
	Transparency: number;
}

export interface UILabsChooseControl<T extends unknown[]> extends UILabsControl {
	Type: "Choose";
	List: T;
	DefIndex: number;
}

export interface UILabsEnumListControl<T extends Record<string, unknown>> extends UILabsControl {
	Type: "EnumList";
	List: T;
	DefIndex: string;
}

export type PrimitiveControl = string | number | boolean | Color3;
export type Control =
	| PrimitiveControl
	| UILabsSliderControl
	| UILabsRGBAControl
	| UILabsChooseControl<unknown[]>
	| UILabsEnumListControl<Record<string, unknown>>;

export type Controls = Record<string, Control>;

type InferControlUsedAs<T extends Control> = UsedAs<
	T extends PrimitiveControl
		? T
		: T extends UILabsSliderControl
			? number
			: T extends UILabsRGBAControl
				? { Color: Color3; Transparency: number }
				: T extends UILabsChooseControl<infer U>
					? U[number]
					: T extends UILabsEnumListControl<infer U>
						? U[string]
						: never
>;

function newControl(controlType: string, controlValue: unknown): UILabsControl {
	return {
		EntryType: "Control",
		Type: controlType,
		ControlValue: controlValue,
	};
}

export function slider(initial: number, min: number, max: number, step?: number): UILabsSliderControl {
	if (max <= min) throw `Max UI Labs Slider value (${max}) must be greater than the minimum value (${min})`;

	const control = newControl("Slider", initial) as UILabsSliderControl;

	control.Min = min;
	control.Max = max;
	control.Step = step;

	return control;
}

export function rgba(initial: Color3, transparency?: number): UILabsRGBAControl {
	return newControl("RGBA", {
		Color: initial,
		Transparency: transparency ?? 0,
	}) as UILabsRGBAControl;
}

export function choose<T extends unknown[]>(options: T, index?: number): UILabsChooseControl<T> {
	if (options.size() <= 0) throw "Array given in a Choose control is empty";

	if (index !== undefined && index > options.size())
		throw `Default index (${index}) given for the array is outside of the Choose array size ({#list})`;

	const control = newControl("Choose", options[index ?? 0]) as UILabsChooseControl<T>;
	control.List = options;
	control.DefIndex = index ?? 0;

	return control;
}

export function enumList<T extends Record<string, unknown>>(list: T, initialKey: keyof T): UILabsEnumListControl<T> {
	if (list[initialKey] === undefined)
		throw `Key given for the EnumList list (${initialKey as string}) does not exist in the list`;

	const control = newControl("EnumList", list[initialKey]) as UILabsEnumListControl<T>;
	control.List = list;
	control.DefIndex = initialKey as string;

	return control;
}

export interface FusionStoryProps<C extends Controls> {
	scope: Scope;
	controls: { [K in keyof C]: InferControlUsedAs<C[K]> };
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

			const storyControls: Record<string, Value<unknown>> = {};
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

			const [ok, storyChild] = pcall(story, { controls: storyControls as never, scope: storyScope }) as LuaTuple<
				[boolean, Child]
			>;

			if (!ok) warn("ERROR!!!!", storyChild);

			const holder = new Instance("Folder");

			storyScope.Hydrate(holder)({
				Parent: target,
				[Children]: center
					? storyScope.New("Frame")({
							AnchorPoint: new Vector2(0.5, 0.5),
							AutomaticSize: Enum.AutomaticSize.XY,
							BackgroundTransparency: 1,
							Position: UDim2.fromScale(0.5, 0.5),

							Name: "Center",

							[Children]: storyChild,
						})
					: storyChild,
			});

			return () => doCleanup(storyScope);
		},
	};
}
