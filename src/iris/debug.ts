import Iris from "@rbxts/iris";

export function createDebug() {
	return () => {
		const window = Iris.Window(["Debug"]);
		window.state.position.set(Vector2.zero);
		Iris.End();
	};
}
