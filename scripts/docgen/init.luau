local moonwave = require("./moonwave")
local process = require("@lune/process")
local fs = require("@lune/fs")

type DocPackage = {
	name: string,
	title: string,
	overview: string,
	classes: { string },
}

local INDENT = (" "):rep(4)

local PACKAGES: { DocPackage } = {
	{
		name = "ethereal-for-plugins",
		title = "Ethereal for Plugins",
		overview = "APIs for creating new tools and interacting with the Ethereal plugin.",
		classes = {
			"Ethereal",
			"Lib",
		},
	},
	{
		name = "ethereal-for-games",
		title = "Ethereal for Games",
		overview = "APIs for interacting with the Ethereal plugin in a running game.",
		classes = {},
	},
}

local delimiter = if process.os == "windows" then "\\" else "/"
local function path(...: string)
	return table.concat({ ... }, delimiter)
end

local packagesPath = path(process.cwd, "packages")
local docReferencePath = path(process.cwd, "docs", "docs", "api-reference")

for _, pkg in PACKAGES do
	local dir = path(packagesPath, pkg.name)
	assert(fs.isDir(dir), `no package found for {pkg.name}`)

	local init = path(dir, "init.luau")
	assert(fs.isFile(init), `no init.luau found for {pkg.name}`)

	local extracted = moonwave.extract(init)

	local classSummaries: { [string]: string } = {}

	local classes: { [string]: string } = {}
	for _, moonwaveClass in extracted do
		local summary = ""
		summary ..= "- **"
		summary ..= moonwaveClass.name
		summary ..= ":** "
		summary ..= moonwaveClass.desc

		classSummaries[moonwaveClass.name] = summary

		local functionContents = ""

		local contents = ""
		contents ..= '<article class="ethereal-reference-class" markdown>'
		contents ..= `## {moonwaveClass.name}`
		contents ..= "\n"

		contents ..= "```luau\n"
		contents ..= `type {moonwaveClass.name} = \{\n`

		if #moonwaveClass.functions > 0 then
			for _, moonwaveFunction in moonwaveClass.functions do
				functionContents ..= `### <span class="ethereal-reference-function">function</span> {moonwaveFunction.name}`
				functionContents ..= "\n"
				functionContents ..= "```luau\n"
				functionContents ..= "function "
				functionContents ..= moonwaveClass.name
				functionContents ..= "."
				functionContents ..= moonwaveFunction.name
				functionContents ..= "("

				contents ..= INDENT
				contents ..= moonwaveFunction.name
				contents ..= ": ("

				local functionParameters = {}
				if moonwaveFunction.function_type == "method" then
					table.insert(functionParameters, `self: {moonwaveClass.name}`)
				end

				for _, p in moonwaveFunction.params do
					table.insert(functionParameters, `{p.name}: {p.lua_type}`)
				end

				if #functionParameters > 0 then
					functionContents ..= "\n"
					functionContents ..= INDENT
					functionContents ..= table.concat(functionParameters, ",\n"):gsub("\n", "\n" .. INDENT)
					functionContents ..= "\n"
				end

				contents ..= table.concat(functionParameters, ", ")

				functionContents ..= "): "
				contents ..= ") -> "

				local returns
				if #moonwaveFunction.returns == 0 then
					returns = "()"
				elseif #moonwaveFunction.returns == 1 then
					returns = moonwaveFunction.returns[1].lua_type
				else
					local functionReturns = {}
					for _, r in moonwaveFunction.returns do
						table.insert(functionReturns, r.lua_type)
					end

					returns = `({table.concat(functionReturns, ", ")})`
				end

				contents ..= returns
				functionContents ..= returns

				functionContents ..= "\n```\n"
				functionContents ..= moonwaveFunction.desc
				functionContents ..= "\n"

				if #moonwaveFunction.params > 0 then
					functionContents ..= "\n**Parameters:**\n"

					for _, p in moonwaveFunction.params do
						functionContents ..= `\n- **{p.name}** — {p.desc}\n`
					end
				end

				if #moonwaveFunction.returns > 0 then
					functionContents ..= "\n**Returns:**\n"

					for _, r in moonwaveFunction.returns do
						functionContents ..= `\n- \`{r.lua_type}\` — {r.desc}\n`
					end
				end

				contents ..= ",\n"
			end
		end

		contents ..= "}\n```\n"
		contents ..= moonwaveClass.desc
		contents ..= "\n"
		contents ..= functionContents

		if #moonwaveClass.types > 0 then
			-- contents ..= "### Types"
			-- contents ..= "\n"

			for _, moonwaveType in moonwaveClass.types do
				local desc = ""
				desc ..= moonwaveType.desc

				contents ..= `### <span class="ethereal-reference-type">type</span> {moonwaveType.name}`
				contents ..= "\n"
				contents ..= "```luau"
				contents ..= "\n"
				contents ..= `export type {moonwaveType.name} = `

				if moonwaveType.fields then
					contents ..= "{\n"

					desc ..= "\n"

					for _, moonwaveField in moonwaveType.fields do
						contents ..= "" .. INDENT
						contents ..= moonwaveField.name
						contents ..= ": "
						contents ..= moonwaveField.lua_type
						contents ..= ",\n"

						desc ..= `\n- **{moonwaveField.name}** — {moonwaveField.desc}`
					end

					contents ..= "}\n"
				end

				contents ..= "```"
				contents ..= "\n"
				contents ..= desc
				contents ..= "\n"
			end
		end

		contents ..= "</article>"

		classes[moonwaveClass.name] = contents
	end

	local contents = ""
	contents ..= "---\n"
	contents ..= "template: reference.html\n"
	contents ..= "---"
	contents ..= "\n\n"
	contents ..= "<!-- This file was @generated by `lune run scripts/docgen` and is not intended for manual editing. -->"
	contents ..= "\n\n"
	contents ..= `# {pkg.title}`
	contents ..= "\n"
	contents ..= pkg.overview
	contents ..= "\n\n"
	contents ..= "**Summary:**\n\n"

	local actualContent = ""

	for _, c in pkg.classes do
		local classContent = classes[c]
		assert(classContent, `no class {c} in {pkg.name}`)

		local classSummary = classSummaries[c]

		contents ..= classSummary
		contents ..= "\n"

		actualContent ..= classContent
		actualContent ..= "\n"
	end

	contents ..= "\n\n"
	contents ..= "**Packages:**"
	contents ..= "\n\n"
	contents ..= `- :ethereal-pesde: pesde — [\`@znotfireman/{pkg.name:gsub("-", "_")}\`](https://pesde.dev/packages/znotfireman/{pkg.name:gsub(
		"-",
		"_"
	)})\n`
	contents ..= `- :ethereal-wally: wally — [\`@znotfireman/{pkg.name}\`](https://wally.run/packages/znotfireman/{pkg.name})\n`
	contents ..= `- :ethereal-npm: NPM — [\`@rbxts/{pkg.name}\`](https://pesde.dev/packages/rbxts/{pkg.name:gsub(
		"-",
		"_"
	)})\n\n`

	contents ..= actualContent

	fs.writeFile(path(docReferencePath, pkg.name .. ".md"), contents)
end
