-- local DamageEvent = game:GetService("ReplicatedStorage").DamageEvent
-- local DebounceArray = {}

-- local types={
-- 	Normal=5,
-- 	DoubleDamage=10,
-- 	HighDamage=20,
-- 	Instakill=math.huge, --scary number
-- }

-- DamageEvent.OnServerEvent:Connect(function(Player,Type)
-- 	if DebounceArray[Player.Name] then return end

-- 	if not (tonumber(Type) ~= nil and tonumber(Type) <= 0) then --no debounce for healing
-- 		DebounceArray[Player.Name] = true
-- 		task.delay(0.1, function()
-- 			DebounceArray[Player.Name] = nil
-- 		end)
-- 	end

-- 	local char = Player.Character
-- 	if char ~= nil then
-- 		local Humanoid = char:WaitForChild("Humanoid")
-- 		if tonumber(Type) ~= nil then
-- 			Humanoid:TakeDamage(Type)
-- 		else
-- 			Humanoid:TakeDamage(types[Type] or types.Normal)
-- 		end
-- 	end
-- end)
