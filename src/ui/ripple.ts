// From Ethereal, licenced under The 3-Clause BSD License.

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
