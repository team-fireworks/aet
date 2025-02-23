import Fusion from "@rbxts/fusion";
import { Button, ButtonStyle } from "ui/components/button";
import { fusionStory } from "uilabs";
import { ColorPicker } from "./colorPicker";

export = fusionStory({
	story: ({ scope }) => {
		const colorPicker = new ColorPicker(scope);
		print("WE GOOD???/");
		return (
			<Button
				scope={scope}
				label="Open Color Picker"
				style={ButtonStyle.Primary}
				onClick={() => colorPicker.toggle()}
			/>
		);
	},
});
