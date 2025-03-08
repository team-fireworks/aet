import { Kit } from "types";

const V5_5 = script.WaitForChild("v5.5");
const V5_5_CLIENT_OBJECTS = V5_5.WaitForChild("client-objects");

function modelInserter(model: Model) {
	function insert(parent: Instance, position: CFrame) {
		return [];
	}

	return insert;
}

export const KITS = [
	{
		name: "Eternal Towers of Hell v5.5",
		description: "",

		clientObjects: [
			{
				name: "SpeedBooster",
				description: "",

				insert: modelInserter(V5_5_CLIENT_OBJECTS.WaitForChild("SpeedBooster") as Model),
			},
		],
	},
] satisfies Kit[];
