# Charts

`Chart`, `ChartCard` and `WeatherCharts` port the existing Flux chart rendering and weather builders into the Flow component registry. They do not import Flux or call its services. Flux remains responsible for SQL, project/run selection, EPW parsing, sun-position calculation and preparing hourly result series.

## Install

After the chart release is published, upgrade `@urbanflow/theme` to the release containing the chart tokens, then install the item you need:

```sh
npm install @urbanflow/theme@latest
npx shadcn@latest add https://components.urbanflow.co/r/chart-card.json
# Or all 18 weather analyses (includes ChartCard and Chart):
npx shadcn@latest add https://components.urbanflow.co/r/weather-charts.json
```

Import Tailwind v4 followed by `@urbanflow/theme` in your app stylesheet. Load Figtree and DM Mono, as for other Flow components. Chart.js 4.4.7 and chartjs-chart-matrix 3.0.0 are installed by the registry. Next.js consumers can render these client components from a server page; canvas initialization happens only in the browser.

Registry items are copied into the consuming app, like the other Flow components. They do not update automatically. Theme changes arrive through the versioned theme package. Figma is the design reference; changing a Figma frame does not automatically alter production code.

## Result charts

```tsx
import { ChartCard } from "@/components/ui/chart-card"

<ChartCard
  title="Monthly cooling (kWh)"
  chart={{ kind: "bar", data: {
    columns: ["Month", "Cooling"],
    rows: [[1, 24100], [2, null], [3, 25800]],
  } }}
  description="Monthly ideal-loads cooling for the selected run."
  onRemove={() => removeChart(id)}
/>
```

`Chart` renders only the plot and requires an accessible `label`. `ChartCard` adds a title, optional remove action, Flow Details modal and an expandable data table (first 500 rows, with an explicit count). Pass `loading`, `problem` or `truncated` for the corresponding states. `query` and `provenance` appear in Details. Avoid passing sensitive query text when it should not be visible to the viewer.

| Kind | Columns / input |
| --- | --- |
| `bar`, `line` | Label, then one or more numeric series; `linearX` uses numeric first-column coordinates |
| `scatter` | Numeric x, then one or more numeric y series |
| `range` | Label, low, high, optional mean |
| `matrix`, `psychro` | x, y, value; missing cells are omitted |
| `rose` | Direction label, then cumulative speed-band counts (outer to inner) |
| `sunpath` | Azimuth clockwise from north in degrees, altitude in degrees, optional color value |
| `hourly` | `figure: { min, max, lines }` and optional `unit`; see below |

Use `null` for missing values. Missing series values remain gaps; incomplete ranges are omitted rather than fabricated. Empty and invalid datasets show an explanation. Scatter uses actual numeric x coordinates rather than the old run card's row index.

Hourly lines have `{ label, role, slot, baseline?, points: [{ x, y }] }`. Roles are `series`, `building`, `reference`, `limit` and `peak`; `slot` is a nonnegative palette index. x is the non-leap-year **hour-ending** index, 1–8760; y is numeric or null. Supply sorted points and a finite min/max range. The plot retains dashed baselines, reference/limit styling and peak markers. Compute the figure from run results in the app; this library does not include Flux's run query orchestration.

Colors, grid strokes, chart text styles and both 21-stop color ramps come from Flow CSS variables, resolved on each canvas so scoped themes work. If your application changes the theme dynamically, change `themeKey` on the chart/card/weather collection to redraw the canvas. No global Chart.js defaults are changed. Missing chart tokens produce an explicit setup message.

## Weather charts

```tsx
import { WeatherCharts, type WeatherHours } from "@/components/ui/weather-charts"

<WeatherCharts hours={normalizedWeather as WeatherHours} />
```

`WeatherHours` is a columnar object with `length` and equal-length arrays: `month` (1–12), `dayOfYear` (1–365), `hourOfDay` (0–23), `dryBulb`/`dewPoint` (°C), `relativeHumidity` (%), `humidityRatio` (kg/kg), `ghi`/`dni` (Wh/m²), `globalIlluminance` (lux), `windSpeed` (m/s), `windDirection` (degrees clockwise from north), `opaqueSkyCover` (tenths), `sunAltitude` and `sunAzimuth` (degrees). Normalize EPW sentinels to null before passing data; do not pass raw sentinel values, NaN or Infinity. Sun positions and humidity ratio are calculated by the consuming app's weather reader.

`WEATHER_CHARTS` and `buildWeatherCharts(hours)` are also exported if the app needs its own layout. `hiddenIds` and `onRemove(id)` support controlled removal. The collection contains the same 18 definitions and five sections as Flux. Simplified comfort zones and adaptive estimates are indicative weather analyses, not building comfort certification. Their calculation conventions are preserved from the source.

## Source and review

- Implementation: `City-Syntax/flux` at `dd3f55787707932da9211d6efccae0c930660dfe`, `packages/harness/src/ui/panels/weather/{catalog,chart-data,comfort,sun,temperature,quality,wind,config,plugins}.ts`, `run/TimeChart.tsx`, and date/label helpers from `ui/store/time-range.ts` and `run/hourly.ts`.
- Design: [Flow Design System → Charts](https://www.figma.com/design/NQpg4P9K158sjcEKmMLd8w/Flow-Design-System?node-id=6268-6402). Chart/Axis (Figtree 10/12), Chart/Title (Figtree 14/20 medium), Chart/Query (DM Mono 12/16), existing semantic series colors and both chart ramps are represented in `@urbanflow/theme`.
- Review `/charts` for all nine forms, all 18 weather analyses, and loading/empty/error/invalid/truncation states. The main component page includes a compact gallery. All preview values are generated illustrative data, not private project results.
- Adaptations: React lifecycle and cleanup, Flow Modal/icons, per-instance token styling, accessible data table, numeric scatter x values, missing-data handling and safe large matrix extrema. Flux itself has not been switched to these components by this PR.

Run `npm run check` for component and strict registry types, lint, registry generation and the chart regression tests. `npm run test:charts` runs just those tests.
