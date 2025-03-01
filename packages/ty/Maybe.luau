--!strict
--!nolint LocalShadow
-- Maybe - Non-throwing error values
-- By Elttob, MIT license

export type Some<Value> = { some: true, value: Value }
export type None = { some: false, reason: string? }
export type Maybe<Value> = Some<Value> | None

local Maybe = {}

function Maybe.Some<Value>(value: Value): Some<Value>
	return { some = true, value = value }
end

function Maybe.None(reason: string?): None
	return { some = false, reason = reason }
end

return Maybe
