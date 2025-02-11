import Fusion, { Scope } from "@rbxts/fusion";

export interface EtherealTool {
	name: string;
	description: string;
	icon: string;

	editOnly?: boolean;
	ingameOnly?: boolean;

	run(scope: Scope<typeof Fusion>): void;
}
