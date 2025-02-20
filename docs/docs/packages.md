# Packages

Ethereal offers dependency-free, version-matched APIs for plugins and live
games. `.rbxm` models are available in the latest GitHub release.

Package versions are paired with it's Ethereal plugin version.

## Using Package Managers

For advanced users, Ethereal is published on common Roblox package managers.
It's best with the Plugin API, as you can develop your plugin outside of
Roblox Studio and sync it with Rojo.

The following packages are available:

| Registry | Plugin | Runtime |
| --- | ------ | ------ |
| Wally | `@znotfireman/ethereal-plugin-api` | `@znotfireman/ethereal-runtime-api` |
| Pesde | `@znotfireman/ethereal-plugin-api` | `@znotfireman/ethereal-runtime-api` |
| NPM | `@znotfireman/ethereal-plugin-api` | `@znotfireman/ethereal-runtime-api` |

## Technical Details

These packages wrap an internal `BindableFunction` created by Ethereal inside
`StudioService`.
