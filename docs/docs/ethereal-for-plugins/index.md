# Ethereal for Plugins

The Ethereal for Plugins package enables extending Ethereal with your own tools.

## Plugin Setup

Ensure you have the [Ethereal for Plugins package](../packages.md).

Create a new module, perhaps named `ethereal`, and import the Ethereal for
Plugins package:

```Luau
local plugin = assert(script:FindFirstAncestorWhichIsA("Plugin"))
local Ethereal = require(plugin.packages.ethereal)
```

### Permissions

In order to use any of the Ethereal for Plugins APIs, you must first explicitly
request them using `Ethereal.permission`.

Users will be prompted to allow/deny the plugin for access. This function will
yield until the user responds and will throw if access is denied.

```Luau
local et = Ethereal.permission(plugin, {
    name = "My Plugin",
    icon = "rbxassetid://0987654321",

    permissions = {
        Ethereal.Permissions.Tools
    }
})
```

Alternatively, `Ethereal.tryPermission` returns a result object which can be
handled:

```Luau
local etResult = Ethereal.tryPermission(plugin, {
    -- ...
})

if not etResult.ok then
    return error(`Failed to get Ethereal for Plugins: {etResult.reason} (id: {etResult.id})`)
end

local et = etResult.api
```

### Keys

The API includes a key that uniquely identifies you as an authenticated plugin.
You can store this key as a plugin setting to request permission without
prompting the user for subsequent sessions:


```Luau
local key = plugin:GetSetting("etherealPermissionKey")

local et = Ethereal.permission(plugin, {
    name = "My Plugin",
    icon = "rbxassetid://0987654321",
    key = key,

    permissions = {
        Ethereal.Permissions.Tools
    }
})

if not key then
    plugin:SetSetting("etherealPermissionKey", et.key)
end
```

### Organization

Ethereal for Plugins can now be used, but it's strongly recommended to create a
dedicated module for the permissioned API:

```Luau
local plugin = assert(script:FindFirstAncestorWhichIsA("Plugin"))
local Ethereal = require(plugin.packages.ethereal)

local key = plugin:GetSetting("etherealPermissionKey")

local et = Ethereal.permission(plugin, {
    name = "My Plugin",
    icon = "rbxassetid://0987654321",

    permissions = {
        Ethereal.Permissions.Tools
    }
})

if not key then
    plugin:SetSetting("etherealPermissionKey", et.key)
end

return et
```

You can then require this module and use the returned APIs.

```Lua
local plugin = assert(script:FindFirstAncestorWhichIsA("Plugin"))
local et = require(plugin.ethereal)

print(et.version) --> "0.1.0"
```
