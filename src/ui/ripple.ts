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

import Fusion, { peek, Scope, StateObject } from "@rbxts/fusion";
import { createMotion, Motion, type MotionGoal, type TweenOptions } from "@rbxts/ripple";
import { RunService } from "@rbxts/services";
import { memoize } from "utils/memoize";
import { lockValue, useEventListener } from "utils/ui";

export const tween = memoize(
	(
		time: number,
		style: Enum.EasingStyle = Enum.EasingStyle.Quart,
		direction?: Enum.EasingDirection,
	): TweenOptions => {
		return {
			time,
			style,
			direction,
		};
	},
);

export function useMotion(scope: Scope<typeof Fusion>, initialValue: number): LuaTuple<[StateObject<number>, Motion]>;
export function useMotion<T extends MotionGoal>(
	scope: Scope<typeof Fusion>,
	initialValue: T,
): LuaTuple<[StateObject<T>, Motion<T>]>;
export function useMotion<T extends MotionGoal>(scope: Scope<typeof Fusion>, initialValue: T) {
	const motion = createMotion(initialValue);
	const motionValue = scope.Value(initialValue);

	useEventListener(scope, RunService.PreRender, (delta) => {
		const value = motion.step(delta);
		if (value !== peek(motionValue)) {
			motionValue.set(value);
		}
	});

	return $tuple(lockValue(motionValue), motion);
}
