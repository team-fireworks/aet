import { ExtensionContext, RegisterExtensionProps } from "@rbxts/et";
import { RegisterCommandProps } from "core/ty";
import { CoreCommand } from "core/types";
import { warn } from "log";
import { Scope } from "scope";

// TODO: this needs permissioning
export class Extension {
	private context: ExtensionContext;
	private commands: CoreCommand[];

	constructor(
		private scope: Scope,
		private props: RegisterExtensionProps,
		private init: (ext: ExtensionContext) => void,
		private isExternal: boolean = false,
	) {
		const { plugin: extPlugin, name: extName, icon: extIcon, needs: extNeeds } = props;

		const outerThis = this;

		this.commands = [];

		this.context = table.freeze<ExtensionContext>({
			plugin: extPlugin,
			name: extName,
			icon: extIcon,
			// needs: extNeeds,

			registerCommand(props, run) {
				const someProps = RegisterCommandProps.Cast(props);

				if (!someProps.some) {
					warn(
						`Invalid type for \`registerCommand\` in extension "${extName}": ${someProps.reason ?? "(unknown reason)"}`,
					);
					return;
				}

				const { name, description } = someProps.value;

				outerThis.commands.push({
					name,
					description,
					run,
				});
			},
		});

		this.scope.push(
			this,
			extPlugin.Unloading.Once(() => this.destroy()),
		);

		scope.spawnThread(init, this.context);
	}

	destroy() {
		this.scope.remove(this.scope.indexOf(this));
		this.commands.clear();
	}
}
