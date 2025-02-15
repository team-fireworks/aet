--!strict
-- From Ethereal, licenced under The 3-Clause BSD License.

local StudioService = game:GetService("StudioService")

export type Permissions =
	| "Permissions.RegisterActions"
	| "Permissions.RegisterTools"
	| "Permissions.RegisterExtensions"
	| "Permissions.UseBuiltinActions"
	| "Permissions.UseBuiltinTools"
	| "Permissions.UseExternalActions"
	| "Permissions.UseExternalTools"
	| "Permissions.Notify"
	| "Permissions.ReadSettings"

export type EtherealApi = {
	registerAction: () -> (),
	registerTool: () -> (),
	registerExtension: () -> (),

	notify: () -> (),
}

export type RequestError = | "alreadyRequested" | "invalidType" | "noEthereal" | "denied"

export type RequestResult = {
	ok: true,
	api: EtherealApi,
} | {
	ok: false,
	id: RequestError,
	readable: string,
}

export type RequestProps = {
	name: string,
	icon: string,
	permissions: { Permissions },
}

local Permissions = table.freeze({
	RegisterActions = "Permissions.RegisterActions" :: "Permissions.RegisterActions",
	RegisterTools = "Permissions.RegisterTools" :: "Permissions.RegisterTools",
	RegisterExtensions = "Permissions.RegisterExtensions" :: "Permissions.RegisterExtensions",
	UseBuiltinActions = "Permissions.UseBuiltinActions" :: "Permissions.UseBuiltinActions",
	UseBuiltinTools = "Permissions.UseBuiltinTools" :: "Permissions.UseBuiltinTools",
	UseExternalActions = "Permissions.UseExternalActions" :: "Permissions.UseExternalActions",
	UseExternalTools = "Permissions.UseExternalTools" :: "Permissions.UseExternalTools",
	Notify = "Permissions.Notify" :: "Permissions.Notify",
	ReadSettings = "Permissions.ReadSettings" :: "Permissions.ReadSettings",
})

export type Ethereal = {
	version: string,
	Permissions: typeof(Permissions),
	--- Attempts requesting the Ethereal plugin for the plugin API
	tryRequest: (plugin: Plugin, props: RequestProps) -> RequestResult,
	--- Requests the Ethereal plugin for the plugin API, throwing if it can't
	request: (plugin: Plugin, props: RequestProps) -> EtherealApi,
}

local setOfPermissions: { [Permissions]: true } = {}
for _, permission in pairs(Permissions) do
	setOfPermissions[permission] = true
end

local getPluginEvent: () -> BindableEvent?
do
	local cachedEvent: BindableEvent? = nil
	function getPluginEvent(): BindableEvent?
		if cachedEvent then
			return cachedEvent
		end

		local awaitedEvent = StudioService:WaitForChild("etherealAPIEvent", 15) :: BindableEvent?
		if awaitedEvent and awaitedEvent.ClassName == "BindableEvent" then
			cachedEvent = awaitedEvent
			return awaitedEvent
		end

		return nil
	end
end

local Ethereal = {
	version = "0.1.0",
	Permissions = Permissions,
} :: Ethereal

function Ethereal.tryRequest(plugin, props)
	if typeof(plugin) ~= "Instance" then
		return {
			ok = false,
			id = "invalidType",
			readable = "provided plugin must be a Plugin instance",
		}
	end

	local pluginClassName = plugin.ClassName
	if pluginClassName ~= "Plugin" then
		return {
			ok = false,
			id = "invalidType",
			readable = `expected a Plugin instance, got {pluginClassName}`,
		}
	end

	if typeof(props) ~= "table" then
		return {
			ok = false,
			id = "invalidType",
			readable = `expected props to be a dictionary, got {typeof(props)}`,
		}
	end

	if typeof(props.name) ~= "string" then
		return {
			ok = false,
			id = "invalidType",
			readable = `expected props.name to be a string, got {typeof(props.name)}`,
		}
	end

	if typeof(props.permissions) ~= "table" then
		return {
			ok = false,
			id = "invalidType",
			readable = `expected props.permissions to be an array of Permissions, got {typeof(props.permissions)}`,
		}
	end

	for k, v in props.permissions do
		if typeof(k) ~= "number" then
			return {
				ok = false,
				id = "invalidType",
				readable = `expected props.permissions to be an array of Permissions, got key {k} of type {typeof(k)}`,
			}
		end

		if not setOfPermissions[v :: any] then
			return {
				ok = false,
				id = "invalidType",
				readable = `{v} is not a permission`,
			}
		end
	end

	local pluginEvent = getPluginEvent()
	if not pluginEvent then
		return {
			ok = false,
			id = "noEthereal",
			readable = `cannot find Ethereal API event; is the Ethereal plugin installed?`,
		}
	end

	error("unfinished")
end

function Ethereal.request(plugin, props)
	local result = Ethereal.tryRequest(plugin, props)

	if result.ok then
		return result.api
	end

	return error(`failed to request Ethereal plugin api: {result.readable} (id: {result.id})`)
end

return table.freeze(Ethereal)
