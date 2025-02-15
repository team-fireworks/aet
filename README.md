# All-in-one building plugin for Eternal Towers of Hell

Ethereal is a building suite for Eternal Towers of Hell.

Forget about Archimedes, Elttob Reclass, Elttob Relight, GeomTools, the JToH
Kit tools, the community's Scripting Hub; Ethereal can do it all.

It (will, this isn't done) include:

- Setup and migrate v5.5 kits
- Insert, modify, and inspect ClientObjects with great documentation
- Built-in archimedes, tightropes, and geometry tools
- Insert common sounds and decals
- Autocomplete for LightingConfigurations
- Consolidate attachment particle emitters into single parts
- Headless runtime API for hooking onto Ethereal
- Headless suite API for extending Ethereal with your own functionality

## Suite API

```Luau
-- ethereal ships with dedicated packages for it's headless suite APIs
local Ethereal = require(plugin.Packages.Ethereal)

-- request APIs
local et = Ethereal.assertRequest(plugin, {
    name = "My Ethereal plugin",
    icon = "rbxassetid://1234567890",
    permissions = {
        Ethereal.Permissions.RegisterActions,
        Ethereal.Permissions.RegisterTools,
        Ethereal.Permissions.RegisterExtensions,
    }
})

print(`Hello Ethereal version {et.version.tostring()}!`)

-- actions are simple functions that can be run
-- ie. trimming client object values, fixing conveyor beams
-- these can also be bookmarked and used as a keybindable plugin action
et.registerAction {
    id = "trimClientObjectValues",
    name = "Trim ClientObject Values",
    description = "Deletes double ClientObject values which breaks the kit",

    requiresTower = true,

    run = function(ctx)
        assert(ctx.tower, "required for typechecking")
        for _, v in ctx.tower.ClientSidedObjects:GetDescendants() do
            if not v.Parent or not v.Name == "ClientObject" or not v:IsA("ValueObject") then
                continue
            end

            for _, c in v.Parent:GetDescendants() do
                if c.Name == "ClientObject" and c:IsA("ValueObject") and v ~= c then
                    c:Destroy()
                end
            end
        end
    end
}

-- tools are have a dedicatded menu and are more reserved for advanced uses
-- ie. gradient coloring a frame, setting up tower kits, custom archimedes
-- these can be bookmarked and opened with a keybindable plugin action

-- extensions run in the background with configurable settings & can be toggled
-- ie. automatically anchoring parts, coloring killbrick particles
```
