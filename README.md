<h1>
    All-in-one building plugin for
    <image src="https://raw.githubusercontent.com/znotfireman/ethereal/refs/heads/main/assets/images/etoh.png" width="100px"></image>
</h1>

## About

> [!WARNING]
>
> The plugin doesn't work yet and is missing alot of features. The first alpha
> release is expected by March.

Ethereal is an all-in-one building plugin for Eternal Towers of Hell. The
mission is to consolidate utilities for tower building and provide a
centralized, up-to-date foundation for future work.

Highlights:

- Setup, upgrade, and downgrade v6/v5.5/v5.4/v5.3/v5.2/v5.1 kits
- Built-in archimedes, tightropes, reclassing, and geometry tools
- Insert, modify, and inspect ClientObjects with great documentation
- Insert common sounds and decals
- LightingConfiguration script autocomplete
- Runtime API for hooking onto Ethereal
- Plugin API for extending Ethereal with your own tools

### About tools

Ethereal exposes an API for other plugins to register tools, which contains
arguments and methods. Tools are sandboxed and disallowed from using `plugin`
APIs. Tools however receive a `ToolContext` API inside methods with the selected
tower, unwrapping the tool's arguments, and common utilities.

Take a look:

```Luau
local Ethereal = require(plugin.Packages.Ethereal)

local et = Ethereal.request(plugin, {
    name = "My Ethereal plugin",
    icon = "rbxassetid://1234567890",
    permissions = {
        Ethereal.Permissions.RegisterTools,
    }
})

print(`Hello Ethereal version {et.version.tostring()}!`)

et.registerTool {
    id = "trimClientObjectValues",
    name = "Trim ClientObject Values",
    description = "Deletes double ClientObject values which breaks the kit",

    needsTower = true,

    methods = {
        [Ethereal.Methods.Default] = function(ctx)
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
}
```

### About the plugin

The Ethereal plugin implements the tools APIs and provides a one-stop interface
where users can enable, disable, and configure tools. Secondly, the plugin also
instantiates the runtime and plugin APIs. Finally, the plugin also implements
common tools, including those from the JToH Kit Tools and other plugin
functionality like Archimedes, GeomTools, and the Elttob Suite.

## Contributing

TBA

### Code

### Website

### Tools

## License

Ethereal is licensed under the terms of the [Mozilla Public License Version 2.0](./LICENSE.md).
