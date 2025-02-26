-- local rs = game:GetService("ReplicatedStorage")
-- local ts=game:GetService("TweenService")
-- local bounce = false
-- local uip=game:GetService("UserInputService")
-- local phs=game:GetService("PhysicsService")
-- local origlighting={}
-- local origcclighting={}
-- local changeLighting = rs:WaitForChild("ChangeLighting")
-- local coFolder = rs:WaitForChild("ClientSidedObjects")
-- if coFolder == nil then
-- 	warn("NO FOLDER NAMED \"ClientSidedObjects\"!!! NO CLIENT OBJECTS WILL FUNCTION!!!")
-- end

-- print("This tower uses the version of v5.5 with better scripts!!! yay!!!")

-- local clientParts = Instance.new("Folder", workspace)
-- clientParts.Name = "ClientParts"

-- local configurableProperties = {
-- 	["ColorCorrectionEffect"] = {"Brightness", "Contrast", "Saturation", "TintColor"},
-- 	["BlurEffect"] = {"Size"},
-- 	["Lighting"] = {"Ambient", "OutdoorAmbient", "FogEnd", "FogStart", "FogColor", "ClockTime", "Brightness"},
-- 	["BloomEffect"] = {"Intensity", "Size", "Threshold"},
-- 	["DepthOfFieldEffect"] = {"FarIntensity", "FocusDistance", "InFocusRadius", "NearIntensity"},
-- }

-- local defaultProperties = {}

-- for effect,properties in pairs(configurableProperties) do
-- 	local defaultPropertyTable = {}
-- 	if effect == "Lighting" then
-- 		for _,p in pairs(properties) do
-- 			defaultPropertyTable[p] = game.Lighting[p]
-- 		end
-- 	else
-- 		if game.Lighting:FindFirstChild("LC" .. effect) == nil then
-- 			local lcEffect = Instance.new(effect,game.Lighting)
-- 			lcEffect.Name = "LC" .. effect

-- 			if effect == "BlurEffect" then
-- 				lcEffect.Size = 0
-- 			elseif effect == "DepthOfFieldEffect" then
-- 				lcEffect.FarIntensity = 0
-- 				lcEffect.NearIntensity = 0
-- 			elseif effect == "BloomEffect" then
-- 				lcEffect.Intensity = 1
-- 				lcEffect.Size = 24
-- 				lcEffect.Threshold = 2
-- 			end

-- 			for _,p in pairs(properties) do
-- 				defaultPropertyTable[p] = lcEffect[p]
-- 			end
-- 		end
-- 	end
-- 	defaultProperties[effect] = defaultPropertyTable
-- end

-- --double client object remover
-- for _,d in pairs(workspace:GetDescendants()) do
-- 	if d.Parent and d.Name == "ClientObject" then
-- 		for _,o in pairs(d.Parent:GetDescendants()) do
-- 			if o.Name == "ClientObject" and d ~= o then
-- 				warn("⚠️ Found a double client object value in: " .. d.Parent.Name .. " ⚠️")
-- 				o:Destroy()
-- 			end
-- 		end
-- 	end
-- end

-- function _G:SetLighting(c,ltype) --old function, will remain for the sake of compatibility
-- 	if not c then return end
-- 	local dur=2
-- 	if ltype=='ColorCorrection' and game.Lighting:FindFirstChild('ColorCorrection') then
-- 		if c=='Default' then c=origcclighting end
-- 		for l,p in pairs(c) do
-- 			if not origcclighting[l] then
-- 				origcclighting[l]=game.Lighting.ColorCorrection[l]
-- 			end
-- 		end
-- 		local conf=TweenInfo.new(3,Enum.EasingStyle.Linear,Enum.EasingDirection.Out)
-- 		local tw=ts:Create(game.Lighting.ColorCorrection,conf,c)
-- 		tw:Play()
-- 		for l,p in pairs(c) do
-- 			if type(p)=='string' or type(p)=='boolean' then
-- 				game.Lighting.ColorCorrection[l]=p
-- 			end
-- 		end
-- 	else
-- 		if c=='Default' then c=origlighting end
-- 		for l,p in pairs(c) do
-- 			if not origlighting[l] then
-- 				origlighting[l]=game.Lighting[l]
-- 			end
-- 		end
-- 		local conf=TweenInfo.new(3,Enum.EasingStyle.Linear,Enum.EasingDirection.Out)
-- 		local tw=ts:Create(game.Lighting,conf,c)
-- 		tw:Play()
-- 		for l,p in pairs(c) do
-- 			if type(p)=='string' or type(p)=='boolean' then
-- 				game.Lighting[l]=p
-- 			end
-- 		end
-- 	end
-- 	wait(dur)
-- end

-- local function lightingChange(config)
-- 	if configurableProperties[config.Type] == nil then return end

-- 	local lightingInstance = (config.Type == "Lighting" and game.Lighting) or game.Lighting["LC" .. config.Type]
-- 	local infoTable = {}

-- 	if config.Configuration == "Default" then config.Configuration = defaultProperties[config.Type] end
-- 	if config.TweenInfo == nil then config.TweenInfo = TweenInfo.new(1, Enum.EasingStyle.Linear, Enum.EasingDirection.Out) end

-- 	for property,value in pairs(config.Configuration) do
-- 		if typeof(value)=="string" or typeof(value)=="boolean" then
-- 			lightingInstance[property] = value
-- 		else
-- 			infoTable[property] = value
-- 		end
-- 	end

-- 	ts:Create(lightingInstance,config.TweenInfo,infoTable):Play()
-- end

-- local function resetLighting()
-- 	for effectType,_ in pairs(configurableProperties) do
-- 		task.spawn(function()
-- 			lightingChange({
-- 				Type = effectType,
-- 				Configuration = "Default",
-- 			})
-- 		end)
-- 	end
-- end

-- changeLighting.Event:Connect(function(config)
-- 	lightingChange(config)
-- end)

-- local function ApplyPart(w, scrTable)
-- 	if w.Name=='ChangeLighting' then
-- 		for p,l in pairs(require(w)) do
-- 			if not origlighting[p] then
-- 				origlighting[p]=game.Lighting[p]
-- 			end
-- 			game.Lighting[p]=l
-- 		end
-- 	end

-- 	if w.Name == "ClientObjectScript" then
-- 		if scrTable then
-- 			table.insert(scrTable, w)
-- 		end
-- 	elseif w:IsA("BasePart") then
-- 		if w:FindFirstChild'SetCollisionGroup' then
-- 			task.spawn(function()
-- 				w.CollisionGroup = w.SetCollisionGroup.Value
-- 			end)
-- 		else
-- 			w.CollisionGroup = "ClientObjects"
-- 		end

-- 		if w.Name == "LightingChanger" or w:FindFirstChild("Invisible") then
-- 			w.Transparency = 1
-- 		end
-- 	end
-- end

-- local function addChildren(p, np, scrTable, doNotClone)
-- 	p.ChildAdded:Connect(function(v)
-- 		local c = doNotClone and v or v:Clone()
-- 		c.Parent = np
-- 		addChildren(v, c, scrTable)
-- 		ApplyPart(p, scrTable)
-- 	end)
-- end

-- local addPart = function(v, scrTable, doNotClone)
-- 	if v.Name == "ClientObject" and v.Parent ~= nil then
-- 		local c = (doNotClone and v.Parent) or v.Parent:Clone()
-- 		c.Parent = clientParts
-- 		addChildren(v, c, scrTable, doNotClone)
-- 		ApplyPart(c, scrTable)
-- 		for j,w in pairs(c:GetDescendants()) do
-- 			ApplyPart(w, scrTable)
-- 		end
-- 	end
-- end

-- function LoadTower()
-- 	local scrTable = {}

-- 	local runScript = script.ScriptRunner:Clone()
-- 	runScript.Name = ("TowerPlaceScriptLoader")
-- 	runScript.Parent = game.Players.LocalPlayer.Character

-- 	for i,v in pairs(coFolder:GetDescendants()) do
-- 		addPart(v, scrTable)
-- 	end

-- 	task.wait()
-- 	for _,scr in pairs(scrTable) do
-- 		spawn(function()
-- 			runScript.ExecuteFunction:Fire(scr)
-- 		end)
-- 	end
-- 	table.clear(scrTable)
-- end

-- if game.Players.LocalPlayer.Character then
-- 	LoadTower()
-- end

-- function removeTowerValue()
-- 	for p,l in pairs(origlighting) do
-- 		game.Lighting[p]=l
-- 	end
-- 	game.Lighting.GlobalShadows=false --force off globalshadows because apparently the script has an issue with it
-- 	if game.Lighting:FindFirstChild('ColorCorrection') then
-- 		for p,l in pairs(origcclighting) do
-- 			game.Lighting.ColorCorrection[p]=l
-- 		end
-- 	end

-- 	clientParts:ClearAllChildren()
-- 	LoadTower()
-- end
-- game.Players.LocalPlayer.CharacterAdded:Connect(removeTowerValue)

-- local function initplr(p)
-- 	local function initchar(c)
-- 		if not c then return end
-- 		for i,v in pairs(c:GetChildren()) do
-- 			if v:IsA("BasePart") then
-- 				v.CollisionGroup = 'OtherPlayers'
-- 			end
-- 		end
-- 		c.ChildAdded:connect(function(v)
-- 			if v:IsA("BasePart") then
-- 				v.CollisionGroup = 'OtherPlayers'
-- 			end
-- 		end)
-- 	end
-- 	p.CharacterAdded:Connect(initchar)
-- 	initchar(p.Character)
-- end
-- game.Players.PlayerAdded:Connect(initplr)
-- for _,p in pairs(game.Players:GetPlayers()) do
-- 	if p == game.Players.LocalPlayer then continue end
-- 	initplr(p)
-- end
-- local p=game.Players.LocalPlayer
-- local function initchar(c)
-- 	if not c then return end
-- 	for i,v in pairs(c:GetChildren()) do
-- 		if v:IsA("BasePart") then
-- 			v.CollisionGroup = 'Player'
-- 		end
-- 	end
-- 	c.ChildAdded:connect(function(v)
-- 		if v:IsA("BasePart") then
-- 			v.CollisionGroup = 'Player'
-- 		end
-- 	end)
-- 	resetLighting()
-- end
-- p.CharacterAdded:Connect(initchar)
-- initchar(p.Character)
