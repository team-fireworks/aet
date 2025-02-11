export type Permission = "registerTool"

export type Api = {
	registerTool: () -> (),
	registerTool: () -> (),
}

export type RequestApiResult = {
	success: true,
	api: Api,
} | {}

export type Ethereal = {
	requestApi: (plugin: Plugin) -> (),
}

--[[

    ```Luau
    local ethereal = require(plugin.Packages.Ethereal)

    (plugin, {
        permissions = {
            "registerTool",
            "useTool",
            "registerExtension",
            "notify",
            ""
        }
    })

    Ethereal.registerTool()

    ```

]]
