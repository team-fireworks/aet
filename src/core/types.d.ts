import { Command, EtPermissioned } from "@rbxts/et-for-plugins";

export interface CorePlugin {
	_plugin: Plugin;
	_name: string;
	_icon: string;
}

export interface CoreCommand extends Command {
	_plugin: CorePlugin;
}

/// Used in core/commands
export interface CoreCommandModule {
	name: string;
	icon: string;
	run: (et: EtPermissioned) => void;
}
