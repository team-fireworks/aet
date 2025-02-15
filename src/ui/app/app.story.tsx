// import Fusion, { Children } from "@rbxts/fusion";
// import { InferGenericProps } from "@rbxts/ui-labs";
// import { scope } from "ui/scoped";
// import { App } from "./app";

// const controls = {};

// export = {
// 	controls: controls,
// 	render: (props: InferGenericProps<typeof controls>) => {
// 		const storyScope = scope.deriveScope();

// 		storyScope.Hydrate(props.target)({
// 			[Children]: <App scope={storyScope} />,
// 		});

// 		return () => storyScope.doCleanup();
// 	},
// };
