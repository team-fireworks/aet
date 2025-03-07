return [[-- This Source Code Form is subject to the terms of the Mozilla Public License,
-- v. 2.0. If a copy of the MPL was not distributed with this file, You can
-- obtain one at http://mozilla.org/MPL/2.0/.

-- DO NOT EDIT THIS MODULE
-- YOUR CHANGES WILL BE OVERWRITTEN
-- THIS MODULE IS MANAGED BY THE ET PLUGIN

export type NewExtensiondProps = {
    plugin: Plugin,
    name: string,
    icon: string,
    needs: { string },
}

export type Extension = {
    name: string,
    icon: string,
    plugin: Plugin,
    needs: { string },

    registerCommand: (self: Extension, props: NewCommandProps) -> ()
}

export type NewCommandProps = {
    name: string,
    description: string,
    run: (ctx: CommandContext) -> ()
}

export type CommandContext = {
    getWorkspaceTower: (self: CommandContext) -> Instance?,

    askString: (self: CommandContext, purpose: string, initial: string?) -> string,
    askColor3: (self: CommandContext, purpose: string, initial: Color3) -> Color3,
    askColorSequence: (self: CommandContext, purpose: string, initial: ColorSequence) -> ColorSequence,
}

return {} :: {
    version: string,
    newExtension: (props: NewExtensiondProps) -> Extension
}
]]
