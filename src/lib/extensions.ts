import Aet from "@rbxts/aet";
import Sift from "@rbxts/sift";
import { NewCommandProps, NewExtensiondProps } from "lib/ty";
import { plugin } from "plugin";
import { scope, Scope } from "scope";
import { LibCommand, LibExtension } from "types";

export interface NewExtensionOk {
	ok: true;
	extension: LibExtension;
}

export interface NewExtensionErrInvalidProps {
	ok: false;
	id: "invalidProps";
	readable: string;
}

export type NewExtensionResult = NewExtensionOk | NewExtensionErrInvalidProps;

export function tryNewExtension(
	scope: Scope,
	props: Et.NewExtensiondProps,
	isExternalExtension: boolean = true,
): NewExtensionResult {
	const someProps = NewExtensiondProps.Cast(props);
	if (!someProps.some) {
		return {
			ok: false,
			id: "invalidProps",
			readable: `Cannot create extension with invalid properties: ${someProps.reason ?? "(unknown reason)"}`,
		};
	}

	let destroyed = false;
	const commands = new Set<LibCommand>();
	const { plugin: extPlugin, name: extName, icon: extIcon, needs: extNeeds } = props;

	function destroy() {
		if (destroyed) throw `Attempted to destroy extension "${extName}" twice`;

		scope.remove(scope.indexOf(destroy));
		destroyed = true;

		commands.clear();
	}

	scope.push(
		extPlugin.Unloading.Once(destroy),
		// extPlugin.Destroying.Once(destroy)
	);

	const extension = table.freeze<LibExtension>({
		_commands: commands,
		_isExternalExtension: isExternalExtension,

		plugin: extPlugin,
		name: extName,
		icon: extIcon,
		needs: extNeeds,

		newCommand(props) {
			const someCommandProps = NewCommandProps.Cast(props);

			if (!someCommandProps.some) {
				throw `Cannot create command in "${extName}" with invalid properties: ${someCommandProps.reason ?? "(unknown reason)"}`;
			}

			const { name, description, arguments: args, predicates, run } = someCommandProps.value;

			commands.add({
				_extension: extension,
				name,
				description,
				// fym i have to alias `arguments` im in fucking roblox-ts
				arguments: args,
				predicates,
				run,
			});
		},
	});

	return { ok: true, extension };
}

export function newExtension(
	scope: Scope,
	props: Et.NewExtensiondProps,
	isExternalExtension: boolean = true,
): LibExtension {
	const result = tryNewExtension(scope, props, isExternalExtension);

	if (!result.ok) {
		switch (result.id) {
			case "invalidProps":
				throw result.readable;
		}
	}

	return result.extension;
}

export function newCoreExtension(props: Omit<Aet.NewExtensiondProps, "plugin" | "needs">): LibExtension {
	const newProps = Sift.Dictionary.copy(props as Aet.NewExtensiondProps);
	newProps.plugin = plugin;
	newProps.needs = [];

	const result = tryNewExtension(scope, newProps, true);

	if (!result.ok) {
		switch (result.id) {
			case "invalidProps":
				throw result.readable;
		}
	}

	return result.extension;
}

export const extensions = scope.Value(new Set<LibExtension>());
