--!strict

type Cleanup = () -> ()

export type TowerInstance = Instance & {
	ClientSidedObjects: Instance,
	Obby: Instance & {
		WinPad: BasePart,
	},
	Frame: Instance,
	SpawnLocation: BasePart,
}

export type EtherealBaseArgument = {
	kind: string,
	name: string,
	label: string,
}

type GenericArgument<K, T> = EtherealBaseArgument & {
	kind: K,
	default: T,
}

-- TODO: advanced types: EtherealStringArgument, EtherealNumberArgument, EtherealInstanceArgument
export type EtherealBooleanArgument = GenericArgument<"boolean", boolean>
export type EtherealColor3Argument = GenericArgument<"color3", Color3>
export type EtherealVector2Argument = GenericArgument<"vector2", Vector2>
export type EtherealVector3Argument = GenericArgument<"vector3", Vector3>
export type EtherealColorSequenceArgument = GenericArgument<"colorSequence", ColorSequence>

export type EtherealArgument =
	| EtherealBooleanArgument
	| EtherealColor3Argument
	| EtherealVector2Argument
	| EtherealVector3Argument
	| EtherealColorSequenceArgument

-- FUTURE: bad type, needs recursive Luau type restrictions to be lifted
export type EtherealArgumentContext = {
	now: (self: EtherealArgumentContext) -> any,
	nowOr: (self: EtherealArgumentContext, defaultValue: any) -> any,
	assertBoolean: (self: EtherealArgumentContext) -> EtherealArgumentContext,
	assertColor3: (self: EtherealArgumentContext) -> EtherealArgumentContext,
	assertVector2: (self: EtherealArgumentContext) -> EtherealArgumentContext,
	assertVector3: (self: EtherealArgumentContext) -> EtherealArgumentContext,
	assertColorSequence: (self: EtherealArgumentContext) -> EtherealArgumentContext,
}

export type EtherealRunContext = {
	tower: TowerInstance,
	coFolder: Instance,
	obby: Instance,
	frame: Instance,
	winPad: Instance,
	spawnLocation: Instance,

	arg: (self: EtherealRunContext, argName: string) -> EtherealArgumentContext,

	confirm: (self: EtherealRunContext) -> boolean,
	notify: (self: EtherealRunContext) -> (),

	onAction: (self: EtherealRunContext, buttonLabel: string, callback: () -> ()) -> Cleanup,
	onKeyPressed: (self: EtherealRunContext, keycodes: { Enum.KeyCode }, callback: () -> ()) -> Cleanup,
	onStop: (self: EtherealRunContext, keycodes: { Enum.KeyCode }, callback: () -> ()) -> Cleanup,
}

export type EtherealTool = {
	name: string,
	label: string,
	overview: string,
	description: string,

	needsEdit: boolean?,
	needsRun: boolean?,
	needsTower: boolean?,

	args: { EtherealArgument },

	run: (run: EtherealRunContext) -> Cleanup?,
}

export type Ethereal = {
	newTool: (tool: EtherealTool) -> (),
	notify: (self: EtherealRunContext) -> (),
}

local Permission = table.freeze({
	NewTool = "NewTool" :: "NewTool",
	Notify = "Notify" :: "Notify",
})

export type Permission = "NewTool" | "Notify"

export type PermissionPluginProps = {
	name: string,
	label: string,

	permissions: {
		[Permission]: {
			usedFor: string,
			notUsedFor: string,
			disclaimer: string?,
		},
	},
}

export type TryPermissionPluginResult = {
	ok: true,
	ethereal: Ethereal,
} | {
	ok: false,
	id: "alreadyPermissioned" | "deniedPermission" | "notInstalled",
	readable: string,
}

local Ethereal = {}
Ethereal.Permission = Permission

function Ethereal.permissionPlugin(plugin: Plugin, props: PermissionPluginProps): Ethereal
	error("not yet implemented")
end

function Ethereal.tryPermissionPlugin(plugin: Plugin, props: PermissionPluginProps): TryPermissionPluginResult
	error("not yet implemented")
end

table.freeze(Ethereal)
return Ethereal
