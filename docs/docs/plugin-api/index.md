# Plugin API

## Setup

```Luau
local plugin = assert(script:FindFirstAncestorWhichIsA("Plugin"), "Run this as a plugin!")
local Ethereal = require(plugin.Packages.Ethereal)
```

```Luau
local et = Ethereal.permission(plugin, {
    id = "myFirstEtherealPlugin",
    name = "My First Ethereal Plugin",
    icon = "rbxassetid://1234567890",

    permissions = {}
})
```

```Luau
    permissions = {
        Ethereal.Permissions.CreateTool
    }
```

```Luau
et.createTool {
    id = _,
    name = _,
    overview = _,
    description = _,
    tags = _,

    args = _,

    run = _,
}
```

```Luau
    id = "myFirstTool",
    name = "My First Tool",
    overview = "My First Tool",
    description = "My First Tool",
    tags = {},
```

```Luau
    args = {
        {
            kind = "boolean",
            name = "boolArg",
            label = "Boolean Argument",
            default = true
        }
    },
```

```Luau
    run = function(ctx)
        print("Hello Ethereal!")
    end
```

```Luau
    run = function(ctx)
        ctx.onAction("Click me", function()
            print("Clicked!")
        end)
    end
```

```Luau
    run = function(ctx)
        ctx.onAction("Click me", function()
            print("Clicked!")

            local boolArg = ctx:arg("boolArg"):assertBoolean():unwrap()
        end)
    end
```
