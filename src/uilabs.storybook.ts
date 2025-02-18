// Don't export a storybook if this is required inside a plugin. Otherwise,
// when this plugin reloads, UI Labs crashes.
export = script.FindFirstAncestorWhichIsA("Plugin")
	? undefined
	: {
			name: "Ethereal",
			storyRoots: [script.Parent!.WaitForChild("ui"), script.Parent!.WaitForChild("iris")],
			groupRoots: true,
		};
