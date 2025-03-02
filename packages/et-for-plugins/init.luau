--!strict

--- @class Lib
---
--- Tool library.
---
--- Every Tool `init` function receives the `Lib`, which enables interacting
--- with the current selected tower and the Ethereal plugin.
---
--- Certain APIs require permissions requested from `Ethereal.permission` or
--- `Ethereal.tryPermission`.
local Lib = {}

--- @within Lib
--- @prop scope -- { unknown }
--- The cleanup scope that this tool uses.

--- @within Lib
--- @method tower
--- @return Tower? -- The selected Tower object.
---
--- Returns the selected tower if any.
function Lib:tower() end

--- @interface ActionProps
--- @within Lib
--- @field label string -- The label used for the action button.
---
--- Properties for creating actions.
export type ActionProps = {}

--- @within Lib
--- @method action
--- @param props ActionProps -- Construction properties.
--- @return Action
---
--- Creates a new action. Actions are functions activated as buttons in the tool
--- listings.
function Lib:action(props: ActionProps) end

--- @interface TowerObbyInstance
--- @within Lib
--- @field WinPad BasePart -- When touched finishes a player's run of the tower.
---
--- The Obby folder in an Eternal Towers of Hell tower.
export type TowerObbyInstance = Instance & {
	WinPad: BasePart,
}

--- @interface TowerInstance
--- @within Lib
--- @field ClientSidedObjects Instance -- Contains every ClientObject used in the tower.
--- @field Obby TowerObbyInstance -- Contains the purism and the tower's winpad
--- @field Frame Instance -- The frame of the tower.
--- @field SpawnLocation BasePart -- Where the player will spawn.
---
--- An Eternal Towers of Hell tower instance.
export type TowerInstance = Instance & {
	ClientSidedObjects: Instance,
	Obby: TowerObbyInstance,
	Frame: Instance,
	SpawnLocation: BasePart,
}

--- @class Ethereal
--- @tag etherealdoc-init-class
---
--- Entry point to the Ethereal for Plugins package.
local Ethereal = {}

--- @within Ethereal
--- @param plugin Plugin -- The plugin that is requesting Ethereal's APIs.
--- @param props PermissionProps -- Plugin info and the permissions to request.
--- @return PermissionedApi -- The permissioned Ethereal for Plugins API.
---
--- In order to use any of the Ethereal for Plugins APIs, you must first
--- explicitly request.
---
--- Users will be prompted to allow/deny the plugin for access. This function
--- will yield until the user responds and will throw if access is denied.
---
--- See: `Ethereal.tryPermission`
function Ethereal.permission(plugin: Plugin, props) end

--- @within Ethereal
--- @param plugin Plugin -- The plugin that is requesting Ethereal's APIs.
--- @param props PermissionProps -- Plugin info and the permissions to request.
--- @return TryPermissionResult -- The result of requesting the plugin.
---
--- In order to use any of the Ethereal for Plugins APIs, you must first
--- explicitly request.
---
--- Users will be prompted to allow/deny the plugin for access. This function
--- will yield until the user responds and returns a result object.
---
--- See: `Ethereal.permission`
function Ethereal.tryPermission(plugin: Plugin, props) end

table.freeze(Ethereal)
return Ethereal
