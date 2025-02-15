import Iris from "@rbxts/iris";

export function createDebug() {
	return () => {
		const window = Iris.Window(["Debug"]);
		Iris.End();
	};
}
