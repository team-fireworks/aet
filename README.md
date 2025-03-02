# Et

<img src="https://raw.githubusercontent.com/znotfireman/et/refs/heads/main/assets/images/et.png" align="right" width="200px" />

![CI workflow](https://github.com/znotfireman/et/actions/workflows/ci.yaml/badge.svg)
![Documentation workflow](https://github.com/znotfireman/et/actions/workflows/docs.yaml/badge.svg)
<!-- TODO: replace with actual creator store page once it releases -->
[Roblox Creator Store](https://tenor.com/view/vr-cuddle-time-jtoh-deletion-2025-gif-9159746476639723483?quality=lossless) ·
[Documentation](https://znotfireman.github.io/et)

Et is a full-featured Eternal Towers of Hell companion plugin jampacked with
utilities and a state-of-the-arts foundation for the next decade of tower
building.

> **Warning:**
> Et is unreleased, unfinished, and untested. Pre-alpha releases should be
> availible by March. Contributions are welcomed.

- 🚀 All tower building utilities and scripts under one keybind
- 🧰 First class support for Eternal Towers of Hell v5 (with v6 and MTK v4 coming soon)
- 📦 Comes with archimedes, tightropes, instance reclassing, and gapfill
- 📚 Library of sounds, decals, and client objects
- 🧩 Et for Plugins API for registering your own commands

## About commands

Ethereal exposes an API for other plugins to register commands, which contains
arguments and methods. Commands are sandboxed and disallowed from using `plugin`
APIs. Commands however receive a `CommandRun` API when ran, which enables
prompting the users for values, retrieving the workspace's default tower, and
reading plugin settings.

Take a look:

```Luau
-- require et
local Et = require(game:WaitForChild("Et", math.huge))

-- request access to the plugin API
local et = Et.request(plugin, {
    name = "My Ethereal plugin",
    icon = "rbxassetid://1234567890",
    permissions = {
        -- this permission allows registering new commands
        Et.Permissions.Commands,
    }
})

print(`Hello Et version {et.version.tostring()}!`)

et.registerCommand {
    name = "Trim ClientObject Values",
    description = "Deletes double ClientObject values which breaks the kit",

    predicates = {
        -- this predicate only passes if the user has set a tower for the current workspace
        et.predicates.isTowerSelected
    },

    run = function(run)
        assert(run.tower, "required for typechecking")
        for _, v in run.tower.ClientSidedObjects:GetDescendants() do
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

## About the plugin

TBA

## Contributing

TBA

## License

Et is licensed under the terms of the [Mozilla Public License Version 2.0](./LICENSE.md).
