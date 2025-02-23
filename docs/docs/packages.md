# Packages

Every Ethereal version bundles zero-dependency APIs for plugins and live games.
These are packaged as `.rbxm` models in GitHub releases and published on
common package manager.

## Using Package Managers

For advanced users, Ethereal is published on common Roblox package managers.
This is especially useful if you sync code using a tool like Rojo.

The following packages are available:

| Registry               | Ethereal for Plugins                                                                               | Ethereal for Games                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| :ethereal-pesde: pesde | [`@znotfireman/ethereal_for_plugins`](https://pesde.dev/packages/znotfireman/ethereal_for_plugins) | [`@znotfireman/ethereal_for_games`](https://pesde.dev/packages/znotfireman/ethereal_for_games) |
| :ethereal-wally: Wally | `@znotfireman/ethereal-for-plugins` | `@znotfireman/ethereal-for-games` |
| :ethereal-npm: NPM     | `@rbxts/ethereal-for-plugins` | `@rbxts/ethereal-for-games` |

## Technical Details

These packages wrap an internal `BindableFunction` created by Ethereal inside
`StudioService`.
