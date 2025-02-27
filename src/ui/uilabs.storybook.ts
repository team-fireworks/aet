export = script.FindFirstAncestorWhichIsA("Plugin")
	? undefined
	: {
			name: "Ethereal",
			storyRoots: [script.Parent!.Parent],
		};
