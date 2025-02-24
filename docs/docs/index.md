# Ethereal

!!! danger "ETHEREAL IS IN ACTIVE DEVELOPMENT. IT'S UNRELEASED, UNFINISHED, AND UNTESTED. DO NOT BUILD YOUR TOWERS WITH IT YET. THE DOCUMENTATION IS INCOMPLETE AND WILL CHANGE."

Ethereal is a full-featured Eternal Towers of Hell companion plugin.

- **New user?** Read the [installation guide](../install.md) and the [motivation behind it's creation](#motivation).
- **Existing user?** Read the changelog for recent features and bug fixes.
- **Interested in authoring your own tools?** Read the [Ethereal for Plugin documentation](./ethereal-for-plugins/index.md) and [reference](./reference/ethereal-for-plugins.md).
- **Interested in using Ethereal in games?** Read the [Ethereal for Games documentation]((./ethereal-for-games/index.md)) and [reference](./reference/ethereal-for-games.md).

## Expectations

The documentation assumes:

- You're comfortable with Eternal Towers of Hell tower building.
    - You don't have to be a good builder! Knowing about client objects and
        tower building will be good enough.
    - However, **the documentation will not teach you how to build a tower.**
        If you'd like to learn, check out these resources:

        - [`#building-tutorials`](https://discord.com/channels/551741409624064011/806261451643551835) in the [Eternal Towers of Hell Discord server](https://discord.gg/etoh)

- You're comfortable with using Roblox Studio.
- That — If you're using the API packages — you're familiar with Luau or Roblox
    TypeScript, depending on the flavor you use.

## Motivation

### EToH deserves better

It's time to lay the foundation for the next decade of tower building.

**For builders:** Ethereal consolidates essential tools and resources into a
single, intuitive package, including scripts, plugin functionality, tower kits,
images, sound effects, and ClientObjects. Other plugins can extend the Ethereal
plugin with its own functionality.

**For developers:** Ethereal exposes plugin APIs for extending the plugin with
new tools, and game APIS, for hooking onto Ethereal while playtesting. Ethereal
comes with great documentation that you're reading, type-safe APIs, and
unparalleled DX.

Down the line, Ethereal could:

- Sync custom `ClientObjectScripts` with Rojo
- Sync file system images/sound effects locally with Asphalt

[Tria.OS Companion Plugin]: https://github.com/Tria-Studio/Tria-OS-Plugin

### EToH is too complicated

<img src="../images/others-to-ethereal-light.png#only-light" />
<img src="../images/others-to-ethereal-dark.png#only-dark" />

Building towers in Eternal Towers of Hell can be complex, often requiring
multiple plugins and tools. Ethereal simplifies this process by consolidating
functionality from various plugin into a single, streamlined widget:

Instead of judging these plugins:

- JToH Kit Tools to bootstrap a tower
- JToH Part Counter to ensure your tower doesn't surpass the limits.
- Archimedes for creating curved geometry
- Gapfill from GeomTools for filling misaligned parts
- OozleDraw and AAZIER to create tightropes
- Welder to weld parts faster
- Quality-of-life plugins such as the Elttob Suite

...you get a unified experience with Ethereal:
