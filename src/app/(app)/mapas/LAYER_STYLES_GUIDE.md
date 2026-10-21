# Layer Styles Integration Guide

This guide explains how to integrate Mapbox Studio layer styles into your geoportal application.

## Overview

The application supports custom layer styles from Mapbox Studio. When a layer has a custom style defined (an entry in `layerStyles` keyed by its `source-layer` name), it will use that style instead of the default blue fill style.

> **Note on `hasCustomStyle`:** the runtime does **not** read the
> `hasCustomStyle` field. Style resolution is driven solely by whether an entry
> exists in `layerStyles` for the layer's `source-layer`
> (`createStyledLayer(...)` in `lib/layer-styles.ts`). Keep `hasCustomStyle` as
> documentation metadata, but what actually makes the custom style apply is the
> `sourceLayer` key matching exactly between `lib/city-layers.ts` and
> `lib/layer-styles.ts`.

## How to Add New Layer Styles

### 1. Export Style from Mapbox Studio

1. Go to your Mapbox Studio project
2. Select the layer you want to style
3. Copy the layer configuration from the "Data" tab or export the style
4. The layer configuration should look like this:

```json
{
  "type": "fill",
  "source": "composite",
  "id": "your-layer-id",
  "paint": {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "your-property"],
      0, "#color1",
      100, "#color2"
    ]
  },
  "source-layer": "your-source-layer"
}
```

### 2. Add Style to layer-styles.ts

Add your layer style to the `layerStyles` object in `src/app/(app)/mapas/lib/layer-styles.ts`:

```typescript
export const layerStyles: Record<string, LayerStyle> = {
  // ... existing styles
  "your-source-layer": {
    "type": "fill",
    "source": "composite",
    "id": "your-layer-id",
    "paint": {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "your-property"],
        0, "#color1",
        100, "#color2"
      ]
    },
    "source-layer": "your-source-layer"
  }
}
```

### 3. Update City Layer Configuration

In `src/app/(app)/mapas/lib/city-layers.ts`, register the layer. Make sure `sourceLayer` matches the key you used in `layerStyles` exactly. Keeping `hasCustomStyle: true` is a documentation convention (it is not read at runtime):

```typescript
{
  id: "your-layer-id",
  name: "Your Layer Name",
  description: "Description of your layer",
  tilesetId: "your-tileset-id",
  sourceLayer: "your-source-layer", // MUST match the key in layerStyles
  layerType: "fill",
  hasCustomStyle: true // convention only — not read by the runtime
}
```

## How It Works

1. When a user toggles a layer on/off, `createStyledLayer()` looks up the custom
   style in `layerStyles` using the `sourceLayer` name
2. If a custom style is found, it is used; otherwise, it falls back to the
   default blue style (`createDefaultLayerConfig()`)
3. The layer is added to the map with the appropriate styling

> The `hasCustomStyle` flag is **not** consulted — the presence of a matching
> `sourceLayer` entry in `layerStyles` is what determines the style.

## Example: Adding a New Styled Layer

Let's say you want to add a "Population Density" layer with a custom color scale:

1. **Add to layer-styles.ts:**
```typescript
"population-density": {
  "type": "fill",
  "source": "composite",
  "id": "population-density",
  "paint": {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "density"],
      0, "#f7f7f7",
      100, "#2166ac",
      1000, "#762a83"
    ],
    "fill-opacity": 0.8
  },
  "source-layer": "population-density"
}
```

2. **Add to city-layers.ts:**
```typescript
{
  id: "population-density",
  name: "Densidade Populacional",
  description: "Densidade populacional por região",
  tilesetId: "your-tileset-id",
  sourceLayer: "population-density",
  layerType: "fill",
  hasCustomStyle: true
}
```

## Supported Layer Types

The system currently supports these layer types:
- `fill` - For polygon data
- `line` - For line data
- `circle` - For point data
- `symbol` - For text/label data

## Troubleshooting

- **Layer not showing custom style**: Check that the `sourceLayer` name in `layerStyles` matches exactly with the `sourceLayer` in your city layer configuration. This mismatch is the most common cause of a layer rendering in the default blue.
- **Style not found**: Confirm the `layerStyles` key equals the layer's `source-layer` name (not its `id`). Setting `hasCustomStyle` alone does nothing.
- **Console errors**: Check the browser console for detailed error messages about layer loading (usually a wrong `tilesetId` or `source-layer` name).

## Best Practices

1. Always test your styles in Mapbox Studio before adding them to the code
2. Use meaningful names for your source layers
3. Keep your paint properties optimized for performance
4. Document your color scales and what they represent
