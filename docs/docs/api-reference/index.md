# API Reference

<div class="ethereal-cards" markdown>

-   [**Ethereal for Plugins**](./et-for-plugins.md)

    APIs for creating new tools and interacting with the Ethereal plugin.

-   [**Ethereal for Games**](./et-for-games.md)

    APIs for interacting with the Ethereal plugin in a running game.


</div>

## Type Annotations

Each documented API member includes a type annotation:

```Luau
export type TowerInstance = {
    ClientSidedObjects: Instance,
    Obby: TowerObbyInstance,
    Frame: Instance,
    SpawnLocation: BasePart,
}
```

While these type annotations are designed to be Luau-like, they are ultimately
psuedocode included as a developer aid. For fully accurate and syntactically
valid type information, please refer to the source code directly.
