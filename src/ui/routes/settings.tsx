import Fusion from "@rbxts/fusion";
import { Paragraph } from "ui/components/foundational/paragraph";
import { Scoped } from "ui/scoped";

export function Settings({ scope }: Scoped) {
	return <Paragraph scope={scope} text="Settings" />;
}
