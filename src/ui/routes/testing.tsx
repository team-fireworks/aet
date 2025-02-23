import Fusion from "@rbxts/fusion";
import { Scoped } from "scoped";
import { ColorPicker } from "ui/app/colorPicker";
import { Button, ButtonStyle } from "ui/components/button";

// Temporary because UI Labs is stupid and cant handle making a story :(
export function Testing({ scope }: Scoped) {
	const colorPicker = new ColorPicker(scope);
	return (
		<Button
			scope={scope}
			label="Toggle Color Picker"
			style={ButtonStyle.Primary}
			onClick={() => colorPicker.toggle()}
		/>
	);
}
