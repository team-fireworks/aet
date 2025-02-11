import { Scope } from "ui/scoped";

export interface EtherealTool {
	id: string;
	name: string;
	description: string;
	icon: string;

	editOnly?: boolean;
	ingameOnly?: boolean;

	run(scope: Scope): void;
}

export const tools: EtherealTool[] = [];

export function registerTool(props: EtherealTool) {
	print("New tool", props.name);
	tools.push(props);
}
