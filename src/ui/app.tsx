import Fusion from "@rbxts/fusion";
import { tools } from "tools/api";
import { Scoped } from "ui/scoped";
import { ForValues } from "./components/fusion";
import { Padding } from "./components/layout/padding";
import { Paragraph } from "./components/typography/paragraph";
import { useTheme } from "./theme";

export interface AppProps extends Scoped {}

export function App({ scope }: AppProps) {
	return (
		<frame scope={scope} Size={UDim2.fromScale(1, 1)} Name="Ethereal" BackgroundColor3={useTheme("bg")}>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} scope={scope} />
			<ForValues
				scope={scope}
				each={tools}
				children={(use, scope, t) => (
					<frame scope={scope} AutomaticSize={Enum.AutomaticSize.XY} BackgroundColor3={useTheme("bgLight")}>
						<uilistlayout FillDirection={Enum.FillDirection.Horizontal} scope={scope} />
						<Padding scope={scope} padding={new UDim(0, 8)} />
						<Paragraph scope={scope} text={use(t).name} />
					</frame>
				)}
			/>
		</frame>
	);
}
