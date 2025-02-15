// From Ethereal, licenced under The 3-Clause BSD License.

export enum Permission {
	RegisterActions = "Permissions.RegisterActions",
	RegisterTools = "Permissions.RegisterTools",
	RegisterExtensions = "Permissions.RegisterExtensions",
	UseBuiltinActions = "Permissions.UseBuiltinActions",
	UseBuiltinTools = "Permissions.UseBuiltinTools",
	UseExternalActions = "Permissions.UseExternalActions",
	UseExternalTools = "Permissions.UseExternalTools",
	Notify = "Permissions.Notify",
	ReadSettings = "Permissions.ReadSettings",
}

export interface PermissionDisplay {
	asksTo: string;
}

export const PERMISSION_DISPLAYS: { [K in Permission]: PermissionDisplay } = {
	[Permission.RegisterActions]: {
		asksTo: "Register suite actions",
		// description:
		// 	"Allows registering actions that can be run. " +
		// 	"Actions are one-click simple tools, " +
		// 	"such as trimming ClientObject values or fixing conveyor beams.",
	},
	[Permission.RegisterTools]: {
		asksTo: "Register suite tools",
		// description:
		// 	"Allows registering tools with dedicated menus for advanced usage, " +
		// 	"such as gradient coloring a frame or setting up tower kits.",
	},
	[Permission.RegisterExtensions]: {
		asksTo: "Register background extensions",
		// description:
		// 	"Allows registering background extensions with settings that can be toggled. " +
		// 	"Extensions run continuously in the background, such as watching parts to anchor or coloring killbrick particles.",
	},
	[Permission.UseBuiltinActions]: {
		asksTo: "Use Ethereal suite actions",
		// description: "Allows using the built-in actions provided by Ethereal.",
	},
	[Permission.UseBuiltinTools]: {
		asksTo: "Use Ethereal suite tools",
		// description: "Allows using the built-in tools provided by Ethereal.",
	},
	[Permission.UseExternalActions]: {
		asksTo: "Use external suite actions",
		// description: "Allows using actions registered by other plugins.",
	},
	[Permission.UseExternalTools]: {
		asksTo: "Use external suite tools",
		// description: "Allows using tools registered by other plugins.",
	},
	[Permission.Notify]: {
		asksTo: "Push notifications",
		// description: "Allows this plugin to push notifications through Ethereal.",
	},
	[Permission.ReadSettings]: {
		asksTo: "Read plugin settings",
		// description: "Allows reading the Ethereal settings.",
	},
};
