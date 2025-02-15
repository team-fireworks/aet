-- FIXME: we can't get lib from examples
--!nolint
--!nocheck

local plugin = script:FindFirstAncestorWhichIsA("Plugin")
if not plugin then
	error("This example must be run inside a plugin")
end

---

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ethereal = require(ReplicatedStorage.Packages.Ethereal)

local et = Ethereal.request(plugin, {
	name = "My Ethereal Plugin",
	icon = "rbxassetid://12345890",
	permissions = {
		Ethereal.Permissions.RegisterTools,
		Ethereal.Permissions.Notify,
	},
})

-- hello world
et.registerTool({
	id = "helloWorld",
	name = "Hello World",
	description = "Ethereal Hello World example",

	methods = {
		[Ethereal.Methods.Default] = function()
			et.notify("Hello world!")
		end,
		[Ethereal.Methods.Custom("Custom Method")] = function()
			et.notify("Custom method activated!")
		end,
	},
})

-- more nuanced tool
et.registerTool({
	id = "trimClientObjectValues",
	name = "Trim ClientObject Values",
	description = "Deletes unnecessary ClientObject ValueObjects, which breaks old tower kits.",

	-- this forces the user to select a tower before calling your tool's methods
	needsTower = true,

	methods = {
		[Ethereal.Run.Default] = function(ctx)
			for _, v in ctx.coFolder:GetDescendants() do
				if not v.Parent or v.Name ~= "ClientObject" or not v:IsA("ValueObject") then
					continue
				end

				for _, c in v.Parent:GetDescendants() do
					if c == v or c.Name ~= "ClientObject" or not c:IsA("ValueObject") then
						continue
					end

					c:Destroy()
				end
			end
		end,
	},
})
