import Fusion from "@rbxts/fusion";
import { ScopeProps } from "scope";
import { udimPx, udimScale } from "ui/udim";

export interface CornerProps extends ScopeProps {}

export function CornerSmall({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerSmall" CornerRadius={udimPx(6)} />;
}

export function CornerMid({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerMid" CornerRadius={udimPx(12)} />;
}

export function CornerLarge({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerLarge" CornerRadius={udimPx(18)} />;
}

export function CornerFull({ scope }: CornerProps) {
	return <uicorner scope={scope} Name="CornerFull" CornerRadius={udimScale(1)} />;
}
