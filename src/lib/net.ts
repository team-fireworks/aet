const REMOTE_PARENT = game.GetService("StudioService");
const REMOTE_NAME = "Ethereal(pluginAPI)";

function findRemote() {
	const existing = REMOTE_PARENT.FindFirstChild(REMOTE_NAME);
	if (existing) {
		if (existing.IsA("BindableFunction")) return existing;
		existing.Name = `OLD____${existing.Name}`;
	}

	const remote = new Instance("BindableFunction");
	remote.Name = REMOTE_NAME;
	remote.Parent = REMOTE_PARENT;

	return remote;
}

const remote = findRemote();
