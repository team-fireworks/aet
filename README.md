# Ethereal

Ethereal is a building suite for Eternal Towers of Hell.

It (will) include:

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
Ethereal.request(plugin, {
    Ethereal.Permissions.RegisterTools,
    Ethereal.Permissions.UseTools,
    Ethereal.Permissions.RegisterExtensions,
})

-- register tools
Ethereal.registerTool {
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
```
