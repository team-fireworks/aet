local function isClientObject(inst: Instance): boolean
	local coValue = inst:FindFirstChild("ClientObject")
	return coValue ~= nil and coValue:IsA("BoolValue")
end

return table.freeze({
	isClientObject = isClientObject,
})
