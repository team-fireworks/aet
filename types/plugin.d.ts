interface PluginGui extends Instance {
	Title: string;
	BindToClose(callback: () => void): void;
}

interface Studio extends Instance {
	Theme: StudioTheme;
}
