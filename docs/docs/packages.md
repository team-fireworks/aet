# Packages

Every version of Ethereal includes zero-dependency packages for plugins and
games.

These are packaged as `.rbxm` models on GitHub  Releases and published for
common Roblox package managers.

## Using Package Managers

Ethereal is published on common Roblox package managers. This is especially
useful if you sync code using a tool like Rojo or you want to consume other
packages.

The following packages are available:

| Registry               | Ethereal for Plugins                                                                               | Ethereal for Games                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| :ethereal-pesde: pesde | [`@znotfireman/ethereal_for_plugins`](https://pesde.dev/packages/znotfireman/ethereal_for_plugins) | [`@znotfireman/ethereal_for_games`](https://pesde.dev/packages/znotfireman/ethereal_for_games) |
| :ethereal-wally: Wally | `@znotfireman/et-for-plugins` | `@znotfireman/et-for-games` |
| :ethereal-npm: NPM     | `@rbxts/et-for-plugins` | `@rbxts/et-for-games` |

## Technical Details

These packages wrap an internal `BindableFunction` created by Ethereal inside
`StudioService`.
